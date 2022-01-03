---
title: "Life of a Consultant: First week at a project"
description: "As consultants, we switch from one project to the next regularly. But how do you get started? What do you do in your first week at a new project?"
id: "blog"
date: "2022-01-03"
author: "Benny Cornelissen"
audio: []
images: []
series: []
tags: ["productivity", "consultancy"]
videos: []
---
As consultants we find ourselves getting started on new projects all the time. And it's important to get the first week right. Not only do you want to make a good impression, starting off on bad information, bad assumptions, or with bad blood will make it very difficult to be successful on a project. In our first week, we'll focus on trying to answer 3 questions:

1. What is the landscape?
2. Who are these people?
3. Why am I here?

As a rule of thumb, assume that all your assumptions are wrong, just like all information given during intake interviews will usually turn out to be wrong or incomplete. So let's get started.

## What is the landscape?
As a consultant you'll be brought in because there are problems to solve. Existing things are broken or lacking, or new things need to be built. Either way, it's important to get a good understanding of the technical landscape and the existing documentation.

### Reverse Document
A good thing to do during your first week is to document an overview of your understanding of the landscape, including any questions you have or potential issues you see. Go through any existing documentation, ask questions, and poke around the landscape. Not only will an overview like that help you make sense of all the information thrown at you; you can use it to validate whether or not your understanding is correct. To get that feedback loop, schedule a meeting with your new team to present your findings. Let them explain what you got wrong, fill in the blanks, and get their opinion on any issues you have identified.

### Collaborate on real tasks
Sometimes the best way to get to know a system is to fix it. Team up with one of your new team mates and work on something. This allows you to learn about systems 'from the trenches' but also get a good understanding of the team's approach, their processes, tools, and overall maturity. Are the tasks clearly defined, or are you looking at mostly empty JIRA tickets? Do you end up writing code that is rolled out from a pipeline? Or are you poking around in root shells? How good is existing documentation? Are there obvious 'heroes' on the team that everyone runs to for help?

### Ask (basic) questions
Since you're new in the team, it's your duty to ask questions. Ask as many questions as you can. Ask 'why' for anything that isn't immediately obvious. Pay attention to implicit knowledge, or silent knowledge gaps. Certain bits of 'knowledge' will be assumed as true by a team, just because nobody ever challenged them. Also, even in the most friendly teams there will be someone who is afraid to ask a certain question, because they've already been around too long. Asking basic questions is also a useful way to politely identify and challenge tunnel-vision that might be present.

### Be in 'blameless post-mortem' mode
A large part of getting to know the landscape is finding out where the skeletons are hiding. Getting a good overview of things that are either broken or ready to break. However, you're not necessarily here to identify the killer. For instance, some very important system may be completely undocumented. The code may be terrible, and all operational workflows are manual tasks that are, at best, poorly documented. Are you going to run `git blame`? Maybe. But it should not be to identify who 'messed up'. Because that person may have 'messed up' for all the right reasons (lack of knowledge, lack of time, lack of mandate, etcetera). It's your job to find out what went wrong and why. Often, technical debt is caused by organizational issues. You want to identify those.

An important distinction to make here is the role you have on the project. We'll get into that later, but at this point let's differentiate between:

- You are here *just* to point out what's broken and why
- You are here to help fix the problems

Usually it will be the second. This means you need to be careful pointing out all the flaws in a condescending way. You're here to help the client fix their issues, not to judge them for having issues. I try to always assume that whatever anyone did was done with the best of intentions, because most of the time, that's exactly what happened. But even if it's not, you'll need those people on your side to help fix whatever is broken, and that is going to be a lot harder if those people feel disrespected by your honesty.

## Who are these people?
As I mentioned, most of the time we'll be brought in to help fix the issues, but that's not going to happen in isolation. It's essential to get to know the people you're going to be working with, the culture, the official as well as the implicit power structures, etcetera. Usually it's pretty clear from the start who your immediate teammates/coworkers are, and who you're going to be reporting to. Start there.

### Make it personal
Especially for shorter projects it may be tempting to 'keep it strictly professional'. Don't. For starters, you may end up being around a lot longer than you initially thought, and you will have missed your chance to make that first impression count. Also, personal connections are usually a bit stronger. Those personal connections may make it a lot easier to uncover the real problems and the real power structures. It also just makes day-to-day work more pleasant. So get coffee, talk shop, but also chat about life, hobbies, etcetera. Be approachable.

I'll try to have at least one of those 'coffee meetings' each day in my first weeks. After each meeting, I'll ask "who do you think I need to talk to next?". If a name comes up more than once, put it at the top of your list. Use these meetings to uncover the implicit power structure.

In COVID times, another part of making it personal is to absolutely use video in calls as much as you can. It's totally fine to blur the background if you don't like people seeing your home office (or lack thereof), but seeing faces makes all the difference.

### Make it explicit
Vagueness invariably leads to disappointment. Yet people are very good at making things implicit, which in turn makes them vague. Since you're new, you get to challenge that. Whenever something is vague, ask questions. Make things explicit. And in return, be explicit. Especially in current COVID times, where you find yourself onboarding from home, being explicit is more important than ever. It also helps in managing expectations. Clearly stating what your expectations are, or what someone can expect from you.

Wrong approach: "I might have a look later"
Right approach: "I won't have time to look into it today, but I'm blocking an hour tomorrow morning to have a look. I'll get back to you before lunchtime"

## Why am I here?
Finally, we want to figure out why we're here. And there can be multiple answers to that question, which can also all be correct at the same time. But it's actually not as confusing as it may seem at first glance. There will just be different perspectives, including your own.

### The Assignment
You're brought in for a reason. Usually it will be part of the intake interview or a statement of work. There's a good chance that The Assignment is not the whole picture, or even flatout wrong. But since it is The Assignment it is also how we can contractually measure success. So the least we need to do is be aware of it.

The assignment can also represent the client's view of their particular challenge; the problem they _think_ they have. Knowing what The Assignment is useful as it gives you a starting point from which you can figure out what the _real_ problems are. There may be an underlying root cause, or the problem described in The Assignment is merely a symptom of a much larger issue.

### Company Strategy
It's always good to inform yourself of your client's company strategy. What are they doing? How do they make money? Where are they headed and how do they plan on getting there? It can tell you a lot about where the company is in terms of maturity in your specific area of expertise, the organizational structure, the priorities, and possible roadblocks you may encounter (good luck getting funding if the company priorities are on reducing cost in your area).

### Your Manager
Usually, you will be reporting to someone. For the purpose of this blog, we'll call this person the Manager, but their actual job title may be very different. Their objective should be to enable you in successfully completing The Assignment, so they are your starting point for validation. What does the Manager think about The Assignment? What root causes do they see? Also make sure you verify with them what The Assignment is. Is your understanding of it the same as theirs? And if not, why?

### Your Team
Most of the time, you'll be part of a team. But even if you're not, and you're just the Lonesome Consultant, you'll most likely be interacting with several teams. Get their perspective too, and share what you've learned about what The Assignment is. The bigger the organization, the bigger the chance someone will inform you that "you are not getting the full picture here...". Dig deeper, and bring the various points of view together. If necessary, bring the people together to discuss. A big part of being a consultant is bringing the right people together to have the right conversation.

### You
Last but not least, don't forget about yourself. Why are **you** here? What are your goals as a consultant? I personally strongly believe that a good consulting gig serves all parties involved. Ideally, I'll get something from a project as well. Either learning about new technologies, or building something really awesome. Maybe the project may fuel blog posts, open-source contributions, conference talks or publications. Deciding why you're here will help you in crafting your role at a client, but also help you leave when you're done.

## What's next?
In the first week you'll have asked a bunch of questions, met a lot of people, and learned a lot about the client and their problems. Truthfully, all of the above may take a little more than just 1 week. Sometimes you'll get most of this done in a week, but if it takes a month, that's fine too. The next step is to keep using the connections you've gained. Keep having coffee with people, keep yourself informed and inform them. Keep asking questions and keep bringing people together. And remember why you're here.
