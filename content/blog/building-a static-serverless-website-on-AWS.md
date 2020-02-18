---
title: "Building a static serverless website using S3 and CloudFront"
description: "Hosting static websites is great. As they only contain static assets to be downloaded by the visitor's browser - think HTML, CSS, Javascript, Fonts, images - no server-side code such as Java or PHP needs to be run. They're therefore typically faster to load than dynamic websites, they have a smaller attack surface, and are easier to cache for even better performance."
id: "blog"
date: "2020-02-18"
image: "img/static-serverless.png"
author: "Sander Knape"
canonicalUrl: https://sanderknape.com/2020/02/building-a-static-serverless-website-using-s3-cloudfront/
audio: []
images:
- "img/static-serverless.png"
series: []
tags: ["serverless", "AWS", "S3", "Cloudfront"]
videos: []
---
Hosting static websites is great. As they only contain static assets to be downloaded by the visitor's browser - think HTML, CSS, Javascript, Fonts, images - no server-side code such as Java or PHP needs to be run. They're therefore typically faster to load than dynamic websites, they have a smaller attack surface, and are easier to cache for even better performance.

That is why some time ago I moved this blog from a Wordpress installation hosted on EC2 to a static website. As I was already in AWS, and I knew that S3 + CloudFront was a popular choice for hosting static websites, I decided to host my blog in S3 with CloudFront in front of it as the CDN.

I was however a little disappointed when I started configuring these services. The obvious methods for using S3 and CloudFront had some severe limitations and it took me longer than I liked to find proper solutions for these limitations. It's not very clear from the AWS documentation how to properly host a static, serverless website using S3 and CloudFront.

Therefore, in this blog I'll first explain the (unexpected) challenge and then provide two different solutions to this challenge. [Let's dive in!](https://sanderknape.com/2020/02/building-a-static-serverless-website-using-s3-cloudfront/)