---
title: "What they did not tell you about using Amazon DocumentDB…"
description: "But they should have"
id: "blog"
date: "2021-08-30"
image: ""
author: "Tom Kennes"
audio: []
images:
- "img/blog/documentdb.png"
series: []
videos: []
---

When migrating to AWS, there are so many services you could use! Name any use-case, and probably AWS has got your back. With over 175 AWS services readily available for you to use, you might even have multiple options! Looking for human speech generation? Use Polly. Or are you into scaling your operation beyond the earth? Get busy with satellites using AWS Ground Station. Need to set up first-line support for your customers? Why not use Amazon Connect?

Let me stop here, because I could go on all day! The surplus of available services can be so overwhelming, the somewhat jesterly {{<raw>}}<a href="https://dev.to/rainleander/what-is-aws-infinidash-2mjn">“Infinidash-experiment”</a>{{</raw>}} proofs that it can sometimes even be difficult to discern existing from fictional services.

However, just because a service exists does not necessarily imply that it collects a large customer-base as well. All AWS Services are created equal, but some are more equal than others. That is, some are more mature and useful than others.

On the one hand, there are these services that are omnipresent in most AWS architectures like EC2, S3 or Route53, and on the other hand there are services that are barely used, like AWS Fault Injection Simulator, Amazon Braket and Amazon Sumerian. But then again, maybe I just have not yet met anybody who uses those. If you are a happy customer of one of the less common AWS resources, let me know and {{<raw>}}<a href="mailto:tomkennes@skyworkz.nl">share your thoughts</a> {{</raw>}}!

Next to the commonly known and the barely used services, there is also a kind of grey area of stuff that is interesting, seemingly well put together, and yet barely talked about online. One such a service is Amazon DocumentDB. Therefore, let me share my experience!

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">What is Amazon DocumentDB</h2> {{</raw>}}
First things first. AWS mentions the following:

{{<raw>}}
<i>
“Amazon DocumentDB (with MongoDB compatibility) is a database service that is purpose-built for JSON data management at scale, fully managed and integrated with AWS, and enterprise-ready with high durability.

Amazon DocumentDB is designed from the ground-up to give you the scalability and durability you need when operating mission-critical MongoDB workloads. In Amazon DocumentDB, storage scales automatically up to 64TiB without any impact to your application. It supports millions of requests per second with up to 15 low latency read replicas in minutes, without any application downtime, regardless of the size of your data.”
</i>
<br>
<br>
{{</raw>}}

{{<raw>}}
<img src="/img/blog/documentdb-migration.png" title="documentdb-migration"  class="img-fluid" alt="Responsive image">
{{</raw>}}

See also: {{<raw>}}<a href="https://aws.amazon.com/documentdb/">here</a>{{</raw>}}.

As such, Amazon DocumentDB is not exactly like MongoDB, but apparently compatible enough for AWS to brand it as such. The friendly folks at MongoDB, the people behind the competing product Mongo Atlas, have also analyzed this compatibility and do not really agree. According to MongoDB:

{{<raw>}}
<i>“DocumentDB is not based on the MongoDB server. Rather it emulates the MongoDB API, and runs on top of Amazon’s Aurora backend platform. This creates significant architectural constraints, functionality limitations, and broken compatibility.”</i>
<br>
<br>
{{</raw>}}

See also: {{<raw>}}<a href="https://www.mongodb.com/atlas-vs-amazon-documentdb">here</a>{{</raw>}}.

As such, there seems to be contradicting information online, and perhaps even an underlying conflict of interest...

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Why we (still) went for it</h2> {{</raw>}}
We were in the midst of migrating a large custom application to AWS. Migrating the database from an on-prem MongoDB cluster to AWS was only a small fraction of it. Even though the on-prem shared cluster was sizeable, earlier experimentation already showed that the performance of the application would be much better if the database would be closer to it. In contrast, the data stored in this cluster was not larger than several GBs, so there was also a monetary incentive to opt for a more fitting solution.

Next to that, migrating our database to AWS was also driven by the need to be more in control in the future. The on-prem solution was managed by a different team, which was focusing on other things and did not intend to actively maintain it. There were only a handful of teams making use of MongoDB, so I cannot really blame them for it either. However, by taking vertical ownership over the components of our stack, we knew we could move forward faster in the future! Both with regard to applications making use of these MongoDB databases as well as the database itself. With the advent of Cloud, it is also generally easier to quickly hit the ground running! So let’s go! :)

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Why not Mongo Atlas</h2> {{</raw>}}
There is thus some debate whether Amazon DocumentDB is compatible with MongoDB, which actually already is a red flag. Yet the promise of elasticity, scalability, availability, level of monitoring and ease of integration with the rest of our stack already in AWS, should be taken into account as well. We could have chosen for Mongo Atlas, but we expected that the daunting tasks of convincing distant legal- and IT procurement departments as well as the closer CISO department would take more time than working with the tools at hand. Other projects had already proven so.

Next to that, we cross-referenced the mongo-operations we were running with the compatibility analysis by Mongo and determined that we should be fine! After all, we were mostly doing simple CRUD with a bit more advanced filtering here and there. In the Amazon DocumentDB documentation it is clearly stated that it is compatible with MongoDB. Hence, we should be covered.

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">What happened</h2> {{</raw>}}
We spent some time setting up a complete solution: we set up Terraform in combination with a little bit of CloudFormation to manage our infrastructure as code. And we used Jenkins to automate a bit of testing using for example tfsec. The Jenkins build history also serves as an audit trail, allowing us to see who changed what and when.

Then we switched over the applications to make use of Amazon DocumentDB instead of the on-prem version. We did a bit of testing and quickly noticed a large unexpected dip in the performance. Most queries were taking slightly longer overall, compared to when they were run against the on-prem solution. There was however one query which did not complete within 30 second. As a result, the underlying Kubernetes-cluster hosting the application closed the connection as per the egress-configuration.

The exact query we were running comprised of a generated in-statement with a list of about 800-elements. Each element in turn was composed of a smaller subquery as well. All in all, it looked something like:

```json
db.getCollection('DependencyEntry').find({
    "source": {
        "$in": [
            {
                "artifactIdentifier": {
                    "projectKey": {
                        "key": "SOME-KEY-1"
                    },
                    "repoSlug": "SOME-SLUG-1"
                },
                "branchType": "SOME-BRANCH-TYPE (like: DEVELOP)",
                "branchName": "SOME-BRANCH-NAME (like: develop)"
            },
            {
                "artifactIdentifier": {
                    "projectKey": {
                        "key": "SOME-KEY-2"
                    },
                    "repoSlug": "SOME-SLUG-2"
                },
                "branchType": "SOME-BRANCH-TYPE (like: DEVELOP)",
                "branchName": "SOME-BRANCH-NAME (like: develop)"
            },...
        ]
    }
})
```
First things first, in order to debug query performance Amazon DocumentDB makes use of a Profiling-logs, which you can enable using Amazon DocumentDB parameter groups. Operations longer than the variable `profiler_threshold_ms` will then be logged and made available through CloudWatch under the log group with the name `/aws/docdb/[name-of-documentdb-cluster]/profiler`. Note that this does not include queries that fail due to clients closing their connections, so we first had to adjust our egress timeout limits accordingly.

After we were able to measure the Amazon DocumentDB query performance a bit better, we started scaling up our instance. And then we scaled it up again. And then we tried tweaking the number of instances, read-replicas, networking conditions, etc. Since this did not solve our issue, we had no other option but to create a ticket with AWS support.

AWS responded by mentioning that these types of queries with long in-statements are actually known to give issues and result in exponentially decreasing performance when the number of arguments increases. Yet, it is not mentioned in their documentation (as of writing). This is also what we observed after running some tests:
- 25 arguments: 1.14 seconds
- 50 arguments: 2.23 seconds
- 100 arguments: 4.57 seconds
- 200 arguments: 8.65 seconds
- 400 arguments: 17.3 seconds
- 800 arguments: 47.6 seconds

Contrast this to the performance when running MongoDB as a vanilla container instance in the same Kubernetes-cluster as the applications themselves:
- 800 arguments: 0.3 seconds

Or even against the on-prem MongoDB cluster:
- 800 arguments: 1.7 seconds

AWS then suggested the following steps in order to mitigate the issue:
1. Use $or to concatenate multiple `$in` filters and make sure the number of elements in the `$in` array is around 100, e.g. `db.collection.find({$or: [{position_id:{$in: [<id>*100] }}, {position_id:{$in: [<id>*100] }} …]})` .
2. Send multiple queries with `$in`, then merge the documents on the application side.

Since the application we were migrating was mostly developed several years ago, and does not fit with the future IT landscape as envisioned by the organization, this is not a very satisfying answer. Technically it might also be true that the performance of the query as a whole can be greatly improved by cutting up the query and joining the results later on, but the tests also show that it would still not compete with the potential performance gains we could get when MongoDB would be provided from within the cluster.

It is also interesting that from the tests above it is reasonable to assume that the on-prem MongoDB cluster could have a similar performance as Amazon DocumentDB. Moving the database back is however not an option, as we would give up ownership and control again. Besides, the performance improvement from the in-cluster MongoDB instance is significant!

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Our solution</h2> {{</raw>}}
We started off with deploying a pod with a vanilla MongoDB container in the cluster. Then we made plans to iteratively improve upon the solution following the guidelines as provided by Mongo:
- {{<raw>}}<a href="https://docs.mongodb.com/manual/administration/production-checklist-operations/">Operations Checklist</a>{{</raw>}}
- {{<raw>}}<a href="https://docs.mongodb.com/manual/administration/security-checklist/">Security Checklist</a>{{</raw>}}

However, in the end we came across {{<raw>}}<a href="https://www.percona.com/doc/kubernetes-operator-for-psmongodb/index.html">the Percona MongoDB Operator</a>{{</raw>}}, which ticks of most of the boxes in the above checklists and seems to require less maintenance. Maybe that could be a topic for a future blogpost.

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Takeaways</h2> {{</raw>}}
If you are working on a greenfield project, you will likely work around the limitations, whereas your hands might be more tied when migrating an application from on-premise. For the most common AWS services, like for example EC2, VPC, S3, RDS, Lambda, Route 53, SNS, SQS, ELB, EKS, you should be fine, but for other services AWS development might actually be more in beta than they are letting on in their official correspondence. Hence, be sure to properly test whether the service fits your use-case, look for independent information online and be very critical.

{{<raw>}}
<div style="text-align: center;">
<iframe src="https://giphy.com/embed/gw3IWyGkC0rsazTi" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/test-gw3IWyGkC0rsazTi">via GIPHY</a></p>
</div>
{{</raw>}}

Get in touch! Send me an {{<raw>}}<a href="mailto:tomkennes@skyworkz.nl">email</a> {{</raw>}} or find me on {{<raw>}}<a href="https://www.linkedin.com/in/tajmkennes/">linkedin</a>{{</raw>}}.