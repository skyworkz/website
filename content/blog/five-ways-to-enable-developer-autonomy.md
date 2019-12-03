---
title: "Five ways to enable developer autonomy in AWS"
id: "blog"
date: 2019-07-23T12:52:12+02:00
image: "img/blog/autonomy.jpg"
bgImage: "img/blog.jpg"
author: "Sander Knape"
canonicalUrl: https://sanderknape.com/2019/07/five-ways-enable-developer-autonomy-aws/
---
It hasn’t been that long since it was normal to request compute capacity at some operations department within your organization. In fact, it’s probably still pretty common in some organizations. With the move to virtualization and especially the cloud, this process of course has changed dramatically for the good. Not only compute capacity for applications, but also resources such as databases, queues, load balancers and storage are now available virtually unlimited.

Of course, fully opening up the permissions to create these resources in the cloud poses some risks. Costs may inflate and there are many different security risks involved. Examples are accidentally putting (sensitive) data in public S3 buckets, creating public databases with default admin passwords, or opening up the SSH port to the world.

It is not uncommon for organizations to limit these risks by having every resource request validated by a specific team. This may be an ops team, a DevOps team, a security team, architects, or a platform team. Name it whatever you want. What it comes down to is that someone is in the middle of the development lifecycle for developers who want to build features. However, the gap between dev and ops has severely shrunk in the last few years. How is a queue different these days from an additional function in your code? Especially if that queue is provisioned through Infrastructure as Code, it’s all code in the end.

I believe that it is possible these days to grant developers full autonomy in the Cloud. A team - I choose to call it a platform team - can build a foundation for shared resources that includes built-in reasonable boundaries to enforce constraints to prevent issues with costs and security.

The goal of this platform team should be to empower developers to autonomously build their applications in the Cloud. This platform team does not need to be directly in the middle of their development lifecycle. Through automation, security risks are either removed or brought to attention. And it gets better: these risks can be mitigated before they even hit the environment.

I have had the privilege to build such platforms in Amazon Web Services (AWS) in the last few years. In this blog post I’ll go through some of the tools and processes that are available to grant this autonomy.

[Continue reading on on Sander's personal webpage](https://sanderknape.com/2019/07/five-ways-enable-developer-autonomy-aws/)
