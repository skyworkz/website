---
title: "PaaS Design Lessons Learned - Part 1"
description: "Building a PaaS is hard, yet everyone seems to be doing it. In this blog series I will look back on a decade of building bespoke PaaS, and lessons learned along the way."
id: "blog"
date: "2020-05-11"
author: "Benny Cornelissen"
audio: []
images:
- "img/blog/paas.png"
series: []
tags: ["cloud", "architecture", "platform", "PaaS", "Kubernetes", "AWS"]
videos: []
---
I've spent the better part of the past decade designing, building, and running platforms. Those platforms have differed in many ways, but what all of them had in common was that they were built so that software could be deployed and run. In recent years, more and more companies have begun to realize they need to 'be good at shipping software' and have subsequently increased their efforts in that area, often resulting in the creation of bespoke platforms.

In this series of blog posts I will go over various aspects of designing platforms. Things to consider, approaches that work (or don't), and general guidelines for designing platforms that are usable, maintainable, secure, and allow for future development.

## Before we begin: technology
Let’s start by addressing the big T-word. Yes, there usually is a lot of technology involved in creating a PaaS. However, I am not going to tell you which pieces of tech to glue together, or how to do it. After building platforms for over a decade, I’ve learned that whatever tech stack you end up using for a platform will not be the stack you’ll use for the next one. So instead of telling you what tech I glued together on my most recent endeavour, I prefer not to, for two reasons:

Whatever worked in my situation isn’t necessarily the correct match for yours (if that doesn’t make sense to you, this blog series will be for you)
This kind of information doesn’t age well
I’ll touch on technology every now and then, though, mostly to provide examples. But there’s a lot more to building a good platform than technology, and that’s what I want to focus on in this series of blogs.

[Read more on Benny's blog](https://blog.bennycornelissen.nl/post/paas-design-lessons-part-1/)
