---
title: "Deploy your pull requests with GitHub Actions and GitHub Deployments"
description: "Performing (automated) tests on pull requests is a powerful mechanism to reduce the feedback loop on code changes. Known as shift left, the idea is that the earlier you find an issue with your code, the easier it is to fix it. For one, as you wrote the code recently it's easier to get back into it. And of course, any code issue that doesn't hit production is another potential issue for your end-users prevented." 
id: "blog"
date: "2020-05-06"
author: "Sander Knape"
audio: []
images: []
series: []
tags: ["github", "actions"]
videos: []
---
Performing (automated) tests on pull requests is a powerful mechanism to reduce the feedback loop on code changes. Known as shift left, the idea is that the earlier you find an issue with your code, the easier it is to fix it. For one, as you wrote the code recently it's easier to get back into it. And of course, any code issue that doesn't hit production is another potential issue for your end-users prevented.

There are situations in which it makes sense to spin up the pull request in a (temporary) environment. This allows someone to manually login to the environment and see if everything looks OK. It may also be a convenient way to run automated end-to-end or integration tests as other dependencies (e.g. databases or other services) can also be available in that environment.

[Read more on Sander his blog](https://sanderknape.com/2020/05/deploy-pull-requests-github-actions-deployments/)