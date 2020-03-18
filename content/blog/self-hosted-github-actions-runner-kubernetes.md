---
title: "Running self-hosted GitHub Actions runners in your Kubernetes cluster
"
description: "Last year November GitHub released GitHub Actions, a CI/CD solution build on top of GitHub's Source Code Management. GitHub Actions is very convenient to use when your source code is already stored in GitHub as no additional tool is required for your CI/CD requirements. This blog is for example updated through a GitHub Actions workflow whenever I push an update to my GitHub repository (like I just did with this post)." 
id: "blog"
date: "2020-03-16"
author: "Sander Knape"
audio: []
images:
- "img/blog/github_runners.png"
series: []
tags: ["github", "kubernetes", "actions", "ci/cd"]
videos: []
---
Last year November GitHub released GitHub Actions, a CI/CD solution build on top of GitHub's Source Code Management. GitHub Actions is very convenient to use when your source code is already stored in GitHub as no additional tool is required for your CI/CD requirements. This blog is for example updated through a GitHub Actions workflow whenever I push an update to my GitHub repository (like I just did with this post).

Earlier this year GitHub released support for self-hosted runners. These runners run in your own infrastructure which has several advantages. Especially useful is the fact that these runners can access any private resources in your infrastructure such as staging environments for automated testing or secret/artifact management solutions not exposed publicly.

The main downside to keep in mind with these runners however is that they are attached to a repository, and can not be enabled for an entire organization. This is something that should become possible later this year.

In this blog post I'll go through the process of configuring self-hosted runners in Kubernetes. We'll wrap the runner binary in a Docker image and deploy this image using a Kubernetes Deployment. Let's get started!

[Read more on Sander his blog](https://sanderknape.com/2020/03/self-hosted-github-actions-runner-kubernetes/)