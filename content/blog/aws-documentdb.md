---
title: "Something they did not tell you about using AWS DocumentDB…"
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

When migrating to AWS, there are so many services you could use! Name any use-case, and probably AWS has got your back. With over 175 AWS services readily available for you to use, you might even have multiple options! Looking for human speech generation? Use Polly. Or are you in looking to scale your operation beyond the earth? Get busy with satellites using AWS Ground Station. Need to set-up first-line support for your customers? Why not use Amazon Connect?

Let me stop here, because I could go on all day! The surplus of available services can be so overwhelming, the somewhat jesterly “Infinidash-experiment” proofs that it can be difficult to discern existing from fictional services ({{<raw>}}<a href="https://dev.to/rainleander/what-is-aws-infinidash-2mjn">here</a>{{</raw>}}).

However, just because a service exists, it is not necessarily true that it reeks in a large customer-base. Not all AWS Services are created equal, and some are more equal than others. Or at least, some are more mature and useful than others. On the one hand, there are these services that are omnipresent in most AWS architectures like EC2, S3 or Route53, and on the other hand there are services that are barely used, like AWS Fault Injection Simulator, Amazon Braket and Amazon Sumerian. But then again, maybe I just haven’t yet met anybody who uses those. If you are using these, or other less common AWS resources, let me know!

Next to the commonly known and the barely used services, there is also a kind of grey area of stuff that is interesting, seemingly well put together, and yet barely talked about online. One such a service is DocumentDB. Therefore, let me share my thoughts!

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">What is DocumentDB</h2> {{</raw>}}
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

As such, DocumentDB is not exactly like MongoDB, but apparently compatible enough for AWS to brand it as such. The friendly folks at MongoDB, the people behind the competing product Mongo Atlas, have also analysed this compatibility and do not really agree. According to MongoDB:

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
{{<raw>}}<h2 class="display-4">Why we went for it</h2> {{</raw>}}
We were busy migrating a large custom application to AWS and migrating from an on-prem MongoDB cluster to AWS was only a small fraction of it. Even though the on-prem shared cluster was sizeable, earlier experimentation already showed that the performance of that application would be much better if the database would be close to it. In contrast, the data stored in this cluster was not larger than several GBs, so there was also a monetary incentive to opt for a smaller version. 

Next to that, migrating our database-solution to AWS was also driven by the need to be more in control in the future. The on-prem solution was managed by a different team, which was focusing on other things and did not intend to actively maintain it. There were only a handful of teams making use of MongoDB, so I cannot really blame them for it either. However, by taking vertical ownership over the components of our stack, we can move forward faster with regard to applications making use of these MongoDB databases as well as the database itself. With the advent of Cloud, it is generally easier to quickly hit the ground running! So let’s go! :)

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Why not Mongo Atlas</h2> {{</raw>}}
There is thus some debate whether DocumentDB is actually compatible with MongoDB, which actually already is a red flag. Yet the promise of elasticity, scalability, level of monitoring and ease of integration with the rest of our stack already in AWS, should be taken into account as well. We could have chosen for Mongo Atlas, but we expected that the daunting tasks of convincing distant legal- and IT procurement departments as well as the closer CISO department would take more time than working with the tools at hand. Other projects had already proven so.

Next to that, we cross-referenced the mongo-operations we were running with the compatibility analysis by Mongo and determined that we should be fine! We were mostly doing simple CRUD with a bit more advanced filtering here and there, which should be covered by AWS as well.

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">What happened</h2> {{</raw>}}

We spent some time setting up a complete solution: Terraform in combination with a little bit of CloudFormation for IAC, Jenkins to automate a bit of testing using tfsec and to create an audit log of previous deployments using the build history.

Then we switched over the applications to make use of DocumentDB instead of the on-prem version. We did a bit of testing and quickly noticed a large unexpected dip in the performance. Most queries were taking slightly longer overall, compared to when they were run against the on-prem solution. There was however one query which did not complete within 30 seconds, whose connection was therefore closed as per the egress-configuration in the underlying Kubernetes-cluster hosting the application.

The exact query we were running, comprised of a generated in-statement with a list of about 800-elements. Each element in turn was composed of a smaller subquery as well. All in all, it looked something like:

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

So, obviously we started scaling up our instance. And then we scaled it up again. And then we tried tweaking the number of instances, read-replicas, networking conditions, etc. Since this did not solve our issue, we created a ticket with AWS support. They responded that they are aware of the issue, yet it is not mentioned it their documentation (as of writing).

They mentioned that these types of queries with long in-statements are actually known to give issues and result in exponentially decreasing performance when the number of arguments increases. This is also what we observed after running some tests:
- 25 arguments: 1.14 seconds
- 50 arguments: 2.23 seconds
- 100 arguments: 4.57 seconds
- 200 arguments: 8.65 seconds
- 400 arguments: 17.3 seconds
- 800 arguments: 47.6 seconds

Contrast this to the performance when running MongoDB as a vanilla container instance in the same Kubernetes-cluster as the applications themselves:
- 800 arguments: 0.2 seconds

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Takeaways</h2> {{</raw>}}
If you are working on a Greenfield project, you will likely work around the limitations, but in case you are migrating from on-premise, your hands might be more tied. For the most common AWS services, like for example EC2, VPC, S3, RDS, Lambda, Route 53, SNS, SQS, ELB, EKS, you should be fine, but for other services AWS development might actually be more in beta than they are letting on in their official correspondence. Hence, be sure to properly test whether the service actually fits your use-case, look for independent information online and be very critical.

{{<raw>}}
<div style="text-align: center;">
<iframe src="https://giphy.com/embed/gw3IWyGkC0rsazTi" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/test-gw3IWyGkC0rsazTi">via GIPHY</a></p>
</div>
{{</raw>}}
