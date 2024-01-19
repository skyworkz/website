---
title: "Using generative AI models to make a scetch from a photo"
description: "Last year AWS released a new iteration of their API Gateway product: HTTP APIs. This new version promises lower prices, improved performance and some new features. Some features that are available in the older REST API are not (yet) available for HTTP APIs, though. The official comparison page gives a good overview of which features are available in both products."
id: "blog"
date: "2024-01-17"
author: "Robert Czanik"
canonicalUrl:
audio: []
series: []
images:
- "img/blog/original.jpeg"
- "img/blog/anime1.png"
- "img/blog/anime2.png"
-
tags: ["genai", "machinelearning", "images", "stablediffussion"]
videos: []
---
# What is generative AI and why use it?
In this blog post generative AI is introduced, specifically one of the most popular prompt-to-image packages: Stable diffusion.
First of all, the question is what is generative AI: Generative AI is software that uses some form of input from a user to generate content using a deep learing model.
The input is usually given as text, in the form of a prompt which specifies the description of the type of content that you want to generate.
Output generated is usually in some form of media that can be viewed or intepreted by a person in either the form of text, images or in some of the latest generation of Gen-AI models video.

Now with a bit of a definition on what Gen-AI is what it does, I am going to give a bit of a summary on how fun it is to play around with some prompts on one of the most popular image-generating AI: Stable diffusion.

# What is stable diffusion, who developed it, and why should you care:
One of the most popular image Gen-AI packages is called stable diffusion, which takes in text prompts and generates images according to the prompt from a chosen specific model.
The package was developed by the company [Stability-AI](https://stability.ai/), who strives to develop the largest opensource generative AI models, or packages for general public use.
Founded in 2019, they were the original developers of the stable diffusion model where images can be generated from prompts.
The secret sauce that make stable diffusion quite popular is that the model is open-source, meaning that one run it on one's local hardware (if you have a computer with a very strong GPU) or use openly - that is if the specific model is released under an open source licence.
In addition to it being open source is the model quite fast and accurate if compared to previous models that genrated images from text prompts.
The underlying technology that makes stable diffussion so fast is that all images on which it was trained are compressed to a latent space meaning that the generation is not done directly in the image space.
Implying that the model takes up less space in memory than directly storing the compressed images in memory.
For a deep explanation of the underlying technology, see the [blog post](https://techvify-software.com/what-is-stable-diffusion/).

Now, with this generative AI models being available to the general public, why should you care?
It would be wise to become familiar, or at least being aware of this technology as it is pretty powerful.
This type of technology speeds up the development of visual content for blog posts, content creation, prototyping products, marketing for start-ups, or any other daily need for images could easily use this technology.
This type of technology is under my opinion as revolutionary as the transition from film to digital photography, or even the invention of the printing press.

# Where can you get it, and how to use it:
One can very easily get the model and code for stable diffusion from Stability-AI's [website](https://stability.ai/).
The code is not too difficult to understand, but if one does not want the retrain a model or generate custom scripts here is a web-app that is user fiendly on github, [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui).
This specific web-app does all the config that you need for a GPU, if you are running on Mac or Linux all of the nececary file installations are done when you execute the webui.sh script. Note that this was not tested on windows, but it looks as if it will also run there.
This specific web-app does all the config that you need for a GPU, if you are running on Mac or Linux all of the nececary file installations are done when you execute the webui.sh script. Note that this was not tested on windows, but it looks as if it will also run there.

## Creating an image from a prompt

## Altering an existing image
