---
title: "Remote Pair Programming: adapting to 2020"
description: "The art of Pair Programming. Working together on a single piece of code, in the same editor, on the same screen. But not in the same room. In this blog post I’ll show you how you can do it too, and what to look out for."
id: "blog"
date: "2020-05-18"
author: "Benny Cornelissen"
audio: []
images: ["/img/blog/vscode-live-share.jpg"]
series: []
tags: ["cloud", "coding", "productivity"]
videos: []
---
Anyone who works on code and is part of a team is probably familiar with Pair Programming. Even if you don't take one of the more organized approaches as described in [this article by Birgitta Böckeler and Nina Siessegger](https://martinfowler.com/articles/on-pair-programming.html), at some point you'll sit down together with someone else behind a single screen and work on a code problem. Whether it's a user story, or debugging an issue, or transferring knowledge, pairing is often a very effective way to get good results.

But what if you're not in the same room? Or even the same country? Or what if you are, but COVID-19 forces you to keep a good 2 meters distance? My monitor is big, but not _that_ big...

In my previous project our teams were split between Amsterdam and Nairobi, so we would regularly run into the issue that we needed to collaborate with some not even in the same timezone. So what to do?

_(This is a summary of an original blog posted on [Benny's blog](https://blog.bennycornelissen.nl/post/remote-pair-programming/))_

## Making it work

Most of you will have experiences with some of the 'collaboration approaches' that _don't_ work. Sending code snippets over Slack, for example. No context, poor formatting, no highlighting, no line numbers. Screen sharing, is usually the next option. "Can you zoom in please?", or "Can you scroll down a little?" get annoying pretty quickly. And while combining 'tmux' and 'vim' can _technically_ give you 'multiplayer Vim', it'll be quite a challenge to find two people who enjoy using such a setup. We need something better, without having to resort to 'obnoxious command line stuff from the eighties'.

I'm a Vim guy, but I fully recognize most people aren't. Most of the people around me are using VSCode nowadays, and the solution for our problem happens to be based on VSCode.  The core of our solution is the [Live Share Extension Pack](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack) for VSCode. If you want to Remote Pair Program with a colleague, make sure you both have VSCode and the Live Share extension pack installed. Log into your Microsoft/Github account to make Live Share work, and off you go. That's it. No cloud services, VPNs, or firewall rules.

{{<img src="/img/blog/vscode-live-share.jpg" class="img-fluid" title="VSCode Live Share Session" >}}

It gives you a wide range of options while collaborating:

- see the files that are open
- scroll independently through whatever file you want
- arrange the open files as you wish (split panes) without it affecting what the other party sees
- make line comments if you see something strange
- chat in the separate chat tab inside VSCode
- share the terminal (if the iniating party permits it. The terminal is read-only by default. Good call, Microsoft!)
- share a server (HTTP endpoints, DB servers, etcetera)

For more details, check out the [Live Share for VSCode Documentation](https://docs.microsoft.com/en-us/visualstudio/liveshare/use/vscode).
