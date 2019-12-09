---
title: "Installing private Git repositories through npm install in Docker"
id: "blog"
date: "2019-06-17"
image: "img/docker.png"
author: "Sander Knape"
canonicalUrl: "https://sanderknape.com/2019/06/installing-private-git-repositories-npm-install-docker/"
description: "How do you properly use secrets in your Dockerfile? In this blog post we'll look into a common use case: downloading private git repositories through an `npm install`. We'll dive into two different methods to tackle this in a way that we not expose our secrets in our Docker layers."
audio: []
images:
- "img/docker.png"
series: []
tags: ["Git", "Docker"]
videos: []
---

How do you properly use an SSH key in a Dockerfile? There are many ways to do it, including many ways to do it wrong. What you will want to prevent is that your ssh key ends up in one of your intermediate images or layers. These are the layers that Docker creates with pretty much every command in your Dockerfile. You may think that you properly clean up your secrets later in the Dockerfile, but the secret will then still be available in one of these layers.

This is especially problematic when you build your Docker images in a (SaaS) CI/CD tool that supports caching. As the cache is uploaded to the system of your provider, it may very well happen that your secret ands up plain-text on their servers.

If you want to learn more about these layers, be sure to check out this [great post that explains much more](https://medium.com/@jessgreb01/digging-into-docker-layers-c22f948ed612).

How then do you properly use secrets in your Dockerfile? In this blog post we'll look into a common use case: downloading private git repositories through an `npm install`. We'll dive into two different methods to tackle this in a way that we not expose our secrets in our Docker layers.

In this post I'll use a private repository on GitHub as an example. Any other git provider will however also work with this approach.

[Continue reading on Sander's personal blog](https://sanderknape.com/2019/06/installing-private-git-repositories-npm-install-docker/)
