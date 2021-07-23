---
title: "Integrating Kubernetes with 1Password for Infrastructure Secrets"
description: "Decouple your secrets from Kubernetes by using a password manager. Sounds good? According to 1Password this is even enterprise-ready. In this blog I'll show you how to set it up."
id: "blog"
date: "2021-07-23"
author: "Benny Cornelissen"
tags: ["cloud", "kubernetes", "security"]
---

How many Cloud Engineers do you need to implement the correct solution for managing secrets in Kubernetes? The answer: pretty much all of them, and you'll rebuild your solution  roughly every other month.

Cheeky remarks aside, you can probably imagine that this is a returning topic within Skyworkz, and there are as many correct solutions as there are options out there, from Bitnami SealedSecrets to Mozilla SOPS to AWS Secrets Manager to HashiCorp Vault... But in the latest iteration of this discussion our Director (who still likes to be an engineer from time to time) Bas mentioned [1Password Secrets Automation](https://1password.com/secrets/). I personally have been using 1Password for years, and I regularly use the `op` CLI to glue certain things together on my laptop, but using it for Kubernetes? It never occurred to me to use my password manager for that.

Until now...

## About 1Password Secrets Automation
You may wonder why one would even consider doing this. Why would you use a password management tool aimed at end users as a backend for your production Kubernetes infrastructure? Well, things aren't that simple when it comes to 1Password. Earlier this year they [acquired SecretHub](https://blog.1password.com/secrethub-acquisition/), a Dutch startup that developed their own secret management platform. This has directly resulted in the launch of 1Password Secrets Automation. What makes 1Password Secrets Automation special isn't just that it can work with Kubernetes, or Terraform, or Ansible. It's bringing the 1Password user experience (usable front-end, enterprise ready solution for sharing secrets within teams) to infrastructure secrets management. Often the user experience of more infrastructure/platform focused solutions is... adequate at best. There's often a hefty learning curve, and providing access to certain secrets is often cumbersome. 1Password aims to kill a lot of the insecure behaviour and shadow IT existing around this very topic, and I very much hope they succeed.

But does it work?

Providing a nice user experience means very little of course, if it doesn't technically work. Fortunately you can easily test drive this if you already have a 1Password account, without risking unexpected credit card charges. So I spun up a Kubernetes cluster and got to work. You can go ahead and check out [my personal blog](https://blog.bennycornelissen.nl/post/onepassword-on-kubernetes/) for a step by step overview of how to set it up. Spoiler alert: it's fairly easy and it works really well.

## Does this end the discussion?
Probably not. After all, there may be reasons why you can't use 1Password Secrets Automation. Maybe you've just acquired a corporate LastPass subscription and adding a second paid option isn't going to work. Maybe you just flatout can't use any cloud services for this because of security policy. I really like what 1Password is bringing to the conversation though, with an elegant solution that makes it easy to take the secure route, and I'm looking forward to applying it in a production setting at some point. In the mean time, I expect the discussion to still come back every other month. And that's completely fine.
