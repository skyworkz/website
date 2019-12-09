---
title: "Roundup of the most important pre-re:Invent 2019 releases - so far"
description: "The most exciting time of the year for AWS Enthusiasts is upon us. In exactly seven days, AWS re:Invent 2019 will kick off and everyone is excited to see what great features will be released and announced this time around. This year especially though, many new features are already released the weeks leading up to re:Invent. If you haven’t been paying attention, it was easy to much some great new announcements. Therefore, in this blog post, a roundup of the (in my opinion) most important AWS releases in the past few weeks." 
id: "blog"
date: "2019-11-25"
author: "Sander Knape"
audio: []
images:
- "img/meetup.svg"
series: []
tags: ["AWS", "re:Invent"]
videos: []
---
The most exciting time of the year for AWS Enthusiasts is upon us. In exactly seven days, AWS re:Invent 2019 will kick off and everyone is excited to see what great features will be released and announced this time around.

This year especially though, many new features are already released the weeks leading up to re:Invent. If you haven’t been paying attention, it was easy to much some great new announcements. Therefore, in this blog post, a roundup of the (in my opinion) most important AWS releases in the past few weeks.

# EKS managed node groups

Kubernetes is without a doubt the most popular (DevOps) tool in recent years. It is no secret that the Google Cloud offering, [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/), is still the most mature and advanced managed Kubernetes offering. For a long time, the [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) would only manage the control plane. Management of the worker nodes - including security updates, version updates, node draining, e.t.c. - was still up to the customer.

That has changed now with the release of [EKS managed node groups](https://aws.amazon.com/blogs/containers/eks-managed-node-groups/). You can now attach node groups to your EKS control plane, very similar to how you would attach node groups to your Google Cloud GKE clusters. AWS fully takes care of the management of these node groups. You can attach multiple node groups to a single cluster, for example to add different EC2 instance types to your cluster.

Given the speed at which more competitors offer better managed Kubernetes offerings, this was an update long overdue. It’s great to see AWS is taking the first steps towards managing EKS worker nodes for its customers.

If you are considering migrating to EKS managed node groups, I would advice to wait just another 1.5 week or so. Announced [a solid two years ago](https://aws.amazon.com/blogs/aws/aws-fargate/) already, it looks like the release of Fargate for EKS is finally around the corner. This feature is on the top of the [AWS container roadmap](https://github.com/aws/containers-roadmap/projects/1), and a [new IAM policy](https://twitter.com/__steele/status/1197746212406906880?s=19) has already surfaced. This may be one of the most important re:Invent announcements this year.

Fargate for EKS promises to bring an even more advanced managed Kubernetes offering to the landscape. Given AWS has been working on this for at least two years already, I know my expectations are high.

[Read more announcements on Sanders blog](https://sanderknape.com/2019/11/most-important-pre-reinvent-releases/)