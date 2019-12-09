---
title: "Validating Terraform plans with the Open Policy Agent"
description: "With the Open Policy Agent, teams can validate Terraform plans by writing policies as code."
id: "blog"
date: 2019-07-20T09:27:21+02:00
author: "Lennard Eijsackers"
audio: []
images: []
series: []
tags: ["OPA", "Open Policy Agent", "Terraform"]
videos: []
---

Teams in a DevOps organisation should be free to setup and manage the infrastructure for their services. Terraform is a great way to allow teams to declaratively define their infrastructure needs. However, from a compliance and security perspective, you want to place certain guardrails in place. One such guardrail is of course restricting the set of permissions the teams are given. This stops teams from deploying infrastructure your organisation does not have a need for (Most likely your teams do not need to setup [satellite connections from the cloud](https://aws.amazon.com/ground-station/)) and prevents them from editing resources not managed by them. But it does not cover all rules and regulations that you want to enforce. You also want to ensure that teams do not create public databases, or that the naming convention of your organisation is followed.

One approach you could take is to setup an auditing service like [AWS Config](https://aws.amazon.com/config/):

> AWS Config is a fully managed service that provides you with an AWS resource inventory, configuration history, and configuration change notifications to enable security and governance. With AWS Config you can discover existing AWS resources, export a complete inventory of your AWS resources with all configuration details, and determine how a resource was configured at any point in time. These capabilities enable compliance auditing, security analysis, resource change tracking, and troubleshooting.

Together with [AWS system manager automation](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html) you can even automatically remediate actions based on configuration changes. For example you could automatically remove public read/write ACLs from a S3 bucket.

There are two problems with this approach however:

1. It only works for AWS resources. If you have resources in multiple cloud providers or if you are deploying applications on top of Kubernetes you need to setup different tools for those environments. Which also means that you need to spend time to become familiar with those tools. Compliance regulations could be configured differently in the different environments, leading to inconsistency and potential violations of company policy.

2. It is applied after the resources are deployed. Of course in severe cases most likely you automatically remediate the action, meaning no manual action is required. However, there is no visibility for the team why it was changed. They might not even be aware a change happened!

[Read more on Lennards blog](https://www.blokje5.dev/posts/validating-terraform-plans/)