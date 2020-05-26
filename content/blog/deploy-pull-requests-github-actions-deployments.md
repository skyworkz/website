---
title: "Deploy your pull requests with GitHub Actions and GitHub Deployments"
description: "Performing (automated) tests on pull requests is a powerful mechanism to reduce the feedback loop on code changes. Known as shift left, the idea is that the earlier you find an issue with your code, the easier it is to fix it. For one, as you wrote the code recently it's easier to get back into it. And of course, any code issue that doesn't hit production is another potential issue for your end-users prevented." 
id: "blog"
date: "2020-05-06"
author: "Sander Knape"
audio: []
images: ["/img/blog/github_deployments_finished.png"]
series: []
tags: ["github", "actions"]
videos: []
---

Performing (automated) tests on pull requests is a powerful mechanism to reduce the feedback loop on code changes. Known as shift left, the idea is that the earlier you find an issue with your code, the easier it is to fix it. For one, as you wrote the code recently it's easier to get back into it. And of course, any code issue that doesn't hit production is another potential issue for your end-users prevented.

There are situations in which it makes sense to spin up the pull request in a (temporary) environment. This allows someone to manually login to the environment and see if everything looks OK. It may also be a convenient way to run automated end-to-end or integration tests as other dependencies (e.g. databases or other services) can also be available in that environment.

When it comes to deploying pull requests, there are a few things you can do:

 * Automatically deploy all your pull requests to a temporary environment
 * Deploy no pull requests
 * Something in the middle
 
 Something can be said for all options. In many cases it doesn't make sense at all to deploy a pull request (e.g. for libraries). While deploying all your pull requests may sound convenient at first, there are actually some things you'd have to think about:

 {{<img src="/img/blog/github_deployments_finished.png" class="img-fluid px-1 w-50 float-right" title="Deploy pull requests with Github" >}}

 * What about any dependencies such as databases or other services? Maybe any (automated) integration tests you run also change the state in those dependencies. This might mess up other temporary environments deployed through other pull requests. You may therefore also temporarily spin up copies of those dependencies as part of your pull request. While this is certainly possible, the complexity does increase and it may not be fruitful to spend the effort required to build and maintain this.
 * Deploying all your pull requests might start to get expensive when they need many resources and/or when many pull requests are typically open at the same time. This is especially a waste of money, time and energy when you don't run (useful) automated tests on these environments and no one really ever manually checks them out neither.

So what if you could decide which pull request to deploy to an environment? In this blog post I'll share a workflow for manually deploying only specific pull requests through the use of GitHub comments. With some changes, the workflow is definitely also usable for deploying every pull request to a temporary environment (you'll just need a few changes to the workflow). I'll use the GitHub Deployments construct to keep track of the status of these deployments.




[Continue reading on Sander Knape's blog](https://sanderknape.com/2020/05/deploy-pull-requests-github-actions-deployments/)