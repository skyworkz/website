---
id: blog
title: Writing a plugin for the Elastic APM Java agent
description: This blog describes how to write a plugin for R2DBC for Elastic APM Java agent.
author: Sven Rienstra
tags:
  - Java
  - Elastic APM
  - R2DBC
slug: elastic-apm-plugin
date: 2023-07-12
---

As we all know observability is something we rely heavily on in our ever more complex landscape. In order to know if our applications are still doing what they should be doing we can't live without it. But also when something does go wrong it can provide us with very valuable insight of what is going on inside our application.

One of the tools we can use to improve the observability of our applications are Application Performance Monitoring agents (or APM agents). The agents provide information of what is going on inside our applications. They generally do this by instrumenting our code, without necessarily needing any changes within our own code. Most providers of APM tooling have agents available for a wide range of programming languages, such as Java, .Net, Python, PHP, etc. Using the instrumentation the agents can record events, like HTTP requests, database queries and messaging events.

To record events on when for example a HTTP requests starts and ends, the agent will need to hook into the web framework of your choice. The agent provider generally will provide a list of supported technologies and frameworks. In the case of the HTTP request example the agent will dynamically add some code around the web framework to record when a HTTP request starts and ends.

So what do you actually get by using these agents? In the example of Elastic APM you'll be able to see a timeline visualisation like below.

{{<img src="https://www.elastic.co/guide/en/apm/guide/current/images/apm-distributed-tracing.png" class="img-fluid" title="Elastic APM dashboard" >}}

We can see which HTTP request are fired and what database calls are being made. This information can be extremely useful when trying to understand what's happening within your application, for example when looking into a performance issue.

### What if your framework is not supported?

But what to do when your framework of choice is not supported by the agent? By not doing anything you might be missing out on valuable information, so is there anything we can do? Luckily there is! Most APM agents will offer some way of adding manual instrumentation in your code. This might be suitable if you want to add some instrumentation for a very specific use case. But what if for example your database framework is not supported? Adding manual instrumentation for each query is not an ideal solution.

Today we'll be looking at an example were a Java application was using R2DBC (a database framework) and Elastic as the APM provider. The Elastic APM agent offers a plugin api, so we can write our own instrumentation without needing to instrument each individual query.

### How does the APM agent work?

Before we look into how we can write a plugin for our example case, let's dive into how the Elastic APM agent works. The Elastic APM agent uses bytecode manipulation to instrument code, using bytecode manipulation it can modify Java classes at runtime. This way the agent can change a class without recompiling it. What will typically happen is that the agent will add some code when an instrumented method is entered and exited.

A good example to demonstrate how this works in practice is the Servlet API. The Servlet API in Java is the main entry point for most HTTP servers. There are many implementations, but by instrumentation on the API level it doesn't matter which implementation is used. The main entry point for the Servlet API is the `service` method[^1]. We could write instrumentation which would indicate the start of HTTP request the moment the `service` method is entered and indicate the end of the HTTP request the method is exited.

### Let's write our R2DBC plugin

We now have a basic idea of how the APM agent works, so we can have a look at how we could write a plugin for our problem at hand. The aim is to be able to record queries that have been executed, including SQL statement. We first need to identify what our entry point will be to instrument. The most obvious choice seems to be `io.r2dbc.spi.Statement#execute[^2]. According to the javadoc this method is responsible for `Executes one or more SQL statements and returns the Results.`. There is one problem however, the `Statement` API doesn't have any reference to the SQL statement. There are probably some ways around this, but to keep it simple we'll instrument a specific implementation: `io.r2dbc.postgresql.PostgresqlStatement`. This implementation has a `execute` method which takes the SQL statement as parameter.

Now that we know what to instrument, how do we actually record a query has been executed? Elastic is using OpenTelemetry[^3] to record events. In the terminology we call a request a 'trace' and within a trace we can have multiple or nested 'spans'. A span describes a single unit of work, for example a database query. OpenTelemetry also defines conventions of how to record data about the specific unit of work[^4].

Elastic offers a plugin API, to define the plugin we need to extend `ElasticApmInstrumentation`. This offers a couple of overrides to define the plugin. First of all let's define the matchers, describing what we want to instrument:

```java
@Override
public ElementMatcher<? super TypeDescription> getTypeMatcher() {
    return named("io.r2dbc.postgresql.PostgresqlStatement");
}

@Override
public ElementMatcher<? super MethodDescription> getMethodMatcher() {
    return named("execute").and(takesArgument(0, named("java.lang.String")));
}
```

We can see we match on 2 things here, the class name of the type we want to match and the method we want to match on. Now we need to define what we need to do when that method is called:

```java
@Override
public String getAdviceClassName() {
    return "nl.skyworkz.apm.agent.r2dbc.postgresql.R2dbcPostgresqlInstrumentation$HandleExecuteStatementAdvice";
}

public static class HandleExecuteStatementAdvice {

    private static final SignatureParser signatureParser = new SignatureParser();

    @Advice.OnMethodExit(inline = false)
    @Advice.AssignReturned.ToReturned(typing = Assigner.Typing.DYNAMIC)
    public static Flux<PostgresqlResult> onExitExecute(@Advice.Argument(0) String sql,
                                                       @Advice.Return Flux<io.r2dbc.postgresql.api.PostgresqlResult> result) {
        return Mono.defer(() -> Mono.just(createSpan(sql)))
                .flatMapMany(spanBuilder -> {
                    Span span = spanBuilder.startSpan();

                    return result
                            .doOnComplete(() -> {
                                span.setStatus(StatusCode.OK).end();
                            })
                            .doOnError(throwable -> {
                                span.recordException(throwable).end();
                            });
                });
    }

    /**
     * See https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/database.md
     */
    private static SpanBuilder createSpan(String sql) {
        StringBuilder signature = new StringBuilder();
        signatureParser.querySignature(sql, signature, false);

        return getTracer("r2dbc-postgresql")
                .spanBuilder(signature.toString())
                .setSpanKind(SpanKind.CLIENT)
                .setAttribute("db.system", "postgresql")
                .setAttribute("db.statement", sql);
    }
}
```

We wrap around the Reactor type here to start the span before we subscribe to the query result and once it completes we close the span. The span contains the statement (query) being executed. The query will now show up in our timeline (like in the screenshot earlier) and we'll be able to see a summary of the statement and how long it took to execute that statement.

The signature parser that is being used is a copy of the `SignatureParser` class from the JDBC plugin of the APM agent[^5]. To package the plugin a few more steps are needed, you can find them on the Elastic website: https://www.elastic.co/guide/en/apm/agent/java/current/plugin-api.html


[^1]: https://javadoc.io/doc/jakarta.servlet/jakarta.servlet-api/latest/jakarta.servlet/jakarta/servlet/Servlet.html
[^2]: https://javadoc.io/static/io.r2dbc/r2dbc-spi/1.0.0.RELEASE/io/r2dbc/spi/Statement.html#execute--
[^3]: https://opentelemetry.io/
[^4]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/database.md
[^5]: https://github.com/elastic/apm-agent-java/blob/edde161051d71654959cd50ff7c8fc2f738e5354/apm-agent-plugin-sdk/src/main/java/co/elastic/apm/agent/sdk/internal/db/signature/SignatureParser.java#L30
