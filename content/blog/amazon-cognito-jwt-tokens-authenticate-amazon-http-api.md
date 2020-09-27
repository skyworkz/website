---
title: "Using Amazon Cognito JWT tokens to authenticate with an Amazon HTTP API"
description: "Last year AWS released a new iteration of their API Gateway product: HTTP APIs. This new version promises lower prices, improved performance and some new features. Some features that are available in the older REST API are not (yet) available for HTTP APIs, though. The official comparison page gives a good overview of which features are available in both products."
id: "blog"
date: "2020-08-10"
author: "Sander Knape"
canonicalUrl: https://sanderknape.com/2020/08/amazon-cognito-jwt-tokens-authenticate-amazon-http-api/
audio: []
series: []
images:
- "img/blog/cognito.png"
tags: ["authentication", "jwt", "aws"]
videos: []
---
Last year AWS released a new iteration of their API Gateway product: HTTP APIs. This new version promises lower prices, improved performance and some new features. Some features that are available in the older REST API are not (yet) available for HTTP APIs, though. The official comparison page gives a good overview of which features are available in both products.

My favorite new feature available for HTTPs APIs is JWT Authorizers. It is now possible to have the HTTP API validate a JWT token coming from an OIDC or OAuth 2.0 provider. While this was already possible using a Lambda Authorizer, now this can be achieved in a fully managed way with only a minimum amount of work required. It's even easier now to build secure APIs with proper authentication.

In this blog post, I'll create an Amazon Cognito User Pool with a test user and authenticate to an HTTP API using a JWT token issued by Cognito. You can find the fully working code in my GitHub repository. Below I'll go through the code and explain it step by step.


[Continue reading on on Sander's personal webpage](https://sanderknape.com/2020/08/amazon-cognito-jwt-tokens-authenticate-amazon-http-api/)
