---
id: blog
title: Pragmatic Architecture - keeping an open mind
description: When it comes to Architecture, there's a fine line between 'relying on our experience' and 'being dogmatic'. How do you keep an open mind?
summary: As Architects, our experience and judgement are some of our most valuable tools, if we use them properly. Sometimes that experience can result in 'rules of thumb' being applied blindly, or even dogmatic thinking altogether. In this blog we'll explore how to spot these dogmas, and how to keep an open mind while architecting something.
author: Benny Cornelissen
tags:
  - architecture
slug: pragmatic-architecture-keeping-an-open-mind
date: 2023-04-12
---

How many architects does it take to design a good solution? Well that depends, on a lot of things. And all architects in the room will have vastly different ideas on what it actually depends on. If someone pitches a rough outline of a technical problem, they'll probably get responses varying from 'use SaaS product X' to 'Kubernetes' to 'Serverless' to 'well, actually..'.

It becomes a little annoying though when you've been working with a client for months, assessing their current situation, their objectives, their constraints, and their organizational agility to cope with architectural change... only to get _well-actuallied_ by someone who heard about your case 3 minutes ago.

But why does this happen?

## What makes an Architect?
Let's assume that not all Architects are pretentious douchebags, but let's instead look at what makes an Architect. I consider everyone who spends time on architecture an Architect. Whether you're working on software, system design, infrastructure, or data doesn't matter. You're involved in the process of defining and evolving architecture. So what do you need to do that?

Of course you need a solid technical background to start from, ideally with a good range of different technologies. You also need to be able to grasp things quickly. You need to understand why things work, and the pros and cons of different things. But just being technically and analytically strong doesn't get you there.

You need to be able to work towards a good solution, but half the information is missing, incomplete, or downright untrue. And it needs to be done next week. There's no time or budget to _properly_ assess all options, or prototype candidate solutions. And some of the stakeholders will not be available for a chat until next month. Great.

A good Architect knows which questions to ask, which 'information' to question or disregard, how to 'read between the lines', and how to make educated guesses. A huge part of that is building experience, reviewing other architects' work, and becoming good at pattern recognition. Recognizing patterns allows an architect to use their experience to apply certain architectural patterns or guidelines to come up with a (most likely) fitting solution quickly without having to reinvent the wheel each time.

Ultimately though, Architects are just people, and as such they have human flaws; tunnel vision being one of them. When you've applied a certain type of solution successfully a number of times, you're more likely to choose it again. Even in cases where it might not be the best solution. Add in a pinch of pride, and you're well underway to become a Dogmatic Architect.

## When does an Architect become a Dogmatic Architect?
The Dogmatic Architect will typically be over-confident and stubborn. They will propose a solution, based on either a particular Architectural Principle or based on (anecdotal) historical evidence. But don't be too quick to label someone as dogmatic. None of the signs I just described can be measured empirically. So it's just _your_ perspective of that person. They might just feel you don't need to get the full low-down of 3 months of gathering requirements and constraints, and have compressed their story more than you wanted. They might be prioritizing different principles of guidelines than you would normally do. And if that makes someone dogmatic, what does it make you?

I'm not a big fan of labelling people, and especially with these kinds of labels I prefer to tread carefully. An Architect coming across as 'somewhat dogmatic' can be a matter of perspective, different communication styles, or it can be a sign that they are, in fact, a bit stuck in their ways.

A good indicator for dogmatic architecture is when the Architectural Principle or the historical evidence has more weight than the actual requirements or constraints for the target architecture. And the Architect might not even be aware it's happening.

## Avoiding dogmatism
As an experienced Architect, it's hard to not fall victim to dogmatism sometimes. Especially once you think that'll never happen to you.. _especially_ then. It's a careful balancing act between relying on your experience, relying on common and proven architectural patterns, relying on your analysis of the situation at hand, and fact-checking your associative memory. Are you considering something because of the current constraints, or because your experiences primed you to prefer that certain solution?

In my opinion the best starting point is to be very aware of the fact that everyone suffers from tunnel vision. Awareness is half the battle. And while every situation is a little different, there are some things that I try to consistently apply in order to check my biases and my assumptions:

1. At all stages, be clear about what 'your gut feeling' (read: your potential dogmatism) is telling you. Make sure to call it that, too. The information available to you at different stages will lead to different trains of thought. I typically will tell stakeholders that "based on what I know right now, I'm leaning towards XYZ". I may also share my biases if I'm _not_ following them: "Normally, in situations like these I would lean towards XYZ because of \<set of reasons\>, but in this case..." etcetera.
1. Challenge your gut feeling: "What if I can't solve it this particular way?". It's a thought exercise I regularly do, and a pretty good way to pass time while commuting. But you can even develop it into a competing solution if the situation permits. It also allows me to entertain multiple trains of thought through the discovery process. It takes more time, and often time is at a premium, but if you can do it you should.
1. Consistently check the priorities and constraints with stakeholders. This helps in managing expectations, adds clarity, and means you're not making too many assumptions here. You can influence priorities as well, by informing your stakeholders on consequences their prioritization may have, which in turn serves your own thought process. Did you consider the impact of certain choices well enough?
1. Spend time on the downsides of your proposed solution. You're an Architect, not a salesperson. It makes for better solutions, and the added honesty typically is valued a lot.
1. Whiteboard it. Preferably together with someone else. It forces you to start your story from the actual beginning (an empty whiteboard), and go through the process again. The good sessions will send you back to the drawing board to fix a flaw you discovered.. (or overhaul the whole thing)

## Not all knowledge is created equal
Another essential part is to realize not all knowledge has equal value. Some things are empirically true or false. Other things are anecdotal experience. Both are valuable, but you can choose to ignore anecdotal evidence. The same goes for rules of thumb and architectural patterns. I typically differentiate between Architectural Priciples and Guidelines. In the end, you basically end up with 4 categories of information:

- **Fact**: some things are simply true or false. They can be scientifically proven, measured, and it universally applies.
- **Architectural Principle**: is a pattern you deem essential. It describes desired behaviour or a desired outcome of a design. It usually doesn't mention specific technology, and has a timeless nature to it. Examples are: _"Everything as Code"_ or _"Use the highest (cloud) abstraction you can get away with"_. It doesn't delve into whether you should use Terraform or CDK, or Kustomize or Helm. I have built very different platforms over the past decade that _all_ stick to the first principle. The second principle, again, doesn't mandate specific choices, but rather desired design outcomes. Can you get away with a high abstraction like FaaS/serverless? Then that's great. But if your set of requirements, constraints, and priorities leads you to a managed Kubernetes solution, that's still fine. But if you're considering home-growing your custom Kubernetes on EC2 to host a static website, this second principle should set you straight.
- **Architectural Guideline**: is a pattern that you want to consider, but is malleable or even optional. A guideline may go hand-in-hand with a principle to define how to deal with exceptions. For example, you may have a principle that states _"State should be decoupled from the application"_ and a guideline that says _"Minimize state"_. Ideally, nothing has state, and we'll try and prevent having state as much as we can. But if we must have state for application it should be decoupled from the application.
- **Anecdotal Experience**: your own experience, or maybe even someone else's. If you know that a certain approach has worked well 5 times in somewhat comparable situations, that's valuable information. And it can help you figure out if the current situation is in fact comparable or if it's different. Given enough 'proof' and clear understanding of the constraints and implications, anecdotal experience can become a guideline.

Understanding the difference between Facts, Principles, Guidelines, and Experience helps you prioritize your knowledge in flexible way. It helps you check your biases, and helps you dismiss certain parts of your knowledge that may have only popped up because of associate memory.

## My Architect is being dogmatic. Now what?
When you find your Architect is getting too dogmatic, you may want to do something about it. Ask about the business requirements, priorities, and constraints. These should be clear. Ask your Architect to explain how they lead to the suggested solution. If you think a different approach is better, first check if you could answer the previous questions. If so, you could introduce your approach as a question: "I see you're proposing GKE for the containerized workloads. Is there a higher abstraction that we could use as well? Where would something like Cloud Run fall short in this scenario?"

You may learn about constraints or issues that weren't clear before. Or you may snap an Architect out of their tunnel vision, or at least expand their horizon a little. Or perhaps this particular Architect is a douchebag after all. There's always that.