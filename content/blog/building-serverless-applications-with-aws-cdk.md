---
title: "Building serverless applications with the AWS CDK"
description: "The AWS Cloud Development Kit (AWS CDK) is a new framework for defining Infrastructure as Code (IaC) by AWS. It allows you to write IaC in a set of different languages. At the moment the following languages are supported: Javascript, Typescript, Python, Java, .NET. Support for other languages is coming."
id: "blog"
date: "2019-05-31"
image: "img/AWS-CDK.png"
bgImage: "img/blog.jpg"
author: "Sander Knape"
canonicalUrl: https://sanderknape.com/2019/05/building-serverless-applications-aws-cdk
audio: []
images:
- "img/AWS-CDK.png"
series: []
tags: ["cdk", "AWS", "Cloud Development Kit"]
videos: []
---
The [AWS Cloud Development Kit (AWS CDK)](https://docs.aws.amazon.com/cdk/latest/guide/what-is.html) is a new framework for defining Infrastructure as Code (IaC) by AWS. It allows you to write IaC in a set of different languages. At the moment the following languages are supported: Javascript, Typescript, Python, Java, .NET. Support for other languages is coming.

Of course, other methods like CloudFormation and Terraform already exist to write IaC. Using these tools you write declarative code in YAML, JSON or the Hashicorp Configuration Language (HCL) in a mostly declarative state. These tools will also support some basic operators such as if-statements and for-loops. Especially HCL has many of these capabilities with the latest 0.12.0 release. However, it will always be different from using a “real” programming language. And it requires you to use a new tool, instead of using a language you already know.

The CDK generates CloudFormation which is then deployed to AWS. This means that you get the full benefits of writing procedural code in a “normal” programming language of your choice, while also having the benefit of declarative CloudFormation which calculates the difference between the actual and desired state for you and applies the correct changes to get the environment in the desired state.

It’s important to note that the CDK is currently still in beta. Each release comes with a set of breaking changes. However, the intention of the developers is to get the CDK into a solid state that would minimize the amount of breaking changes with each release. Having worked with the CDK for a few months now, I only had to make small changes to my code after a new version was released (which is pretty much every week). I definitely don’t consider this to be a blocker for using the CDK. Also, since the CDK is open source, I was able to contribute a few small features that I was missing.

Of course, the best way to learn is by doing. To get a better feeling of how the CDK works, in this blog post we’ll deploy a serverless application to AWS using the CDK. We’ll also take a look at how we can get run our Serverless Lambda funtions locally using the CDK together with AWS SAM.

[Continue reading on on Sander's personal webpage](https://sanderknape.com/2019/05/building-serverless-applications-aws-cdk/#getting-started-with-the-aws-cdk)
