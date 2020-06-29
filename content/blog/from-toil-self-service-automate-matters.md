---
title: "From toil to self-service: automate what matters"
description: "There are a few reasons that I love my job. One of the most important ones is the variety of work. As a cloud/platform engineer, every day is different. Work goes from writing automation in some programming language, setting up a dashboard in a monitoring/logging tool, hardening Linux machines, writing Infrastructure as Code, building (standardized) CI/CD pipelines, giving workshops, analyzing costs, and more."
id: "blog"
date: "2020-06-22"
image: "img/blog/self-service.png"
author: "Sander Knape"
canonicalUrl: https://sanderknape.com/2020/06/from-toil-self-service-automate-matters/
audio: []
images:
- "img/blog/self-service.png"
series: []
tags: ["Automation"]
videos: []
---
There are a few reasons that I love my job. One of the most important ones is the variety of work. As a cloud/platform engineer, every day is different. Work goes from writing automation in some programming language, setting up a dashboard in a monitoring/logging tool, hardening Linux machines, writing Infrastructure as Code, building (standardized) CI/CD pipelines, giving workshops, analyzing costs, and more.

This wide variety of work wouldn't be possible without automation. You have more time to spend on all these things when manual, repetitive work is automated. SRE [defines toil](https://landing.google.com/sre/sre-book/chapters/eliminating-toil/) as follows:

"*Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows*."

I don't mind toil per se. What I care about is that because I haven't automated something, someone else now needs to wait for me to do some manual work. I'm essentially blocking the software development lifecycle of my colleagues. Furthermore, as part of the definition of toil, this work also scales linearly. So with more services created and the more developers that join the company, more manual work is required from me.

 {{<img src="/img/blog/self-service.png" class="img-fluid px-1 w-50 float-right" title="Build self-service mechanisms to enable autonomy" >}}

I wrote before about some ways to provide autonomy to developers (in that post, specifically in AWS). I definitely believe that providing autonomy is possible by including boundaries for security/costs in automated processes. Instead of performing manual work to do something for a colleague, you can offer this required capability as an automated service: self-service. Without your help, without you “blocking” progress, this self-service capability enables a colleague to get it done autonomously.



[Continue reading on on Sander's personal webpage](https://sanderknape.com/2020/06/from-toil-self-service-automate-matters/)
