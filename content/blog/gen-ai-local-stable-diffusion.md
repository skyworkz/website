---
title: "Using generative AI models to make a sketch from a photo"
description: "Over the past year there has been an explosion of generative AI products. This has not just been the case with LLM-models such as ChatGPT, but also image generation suites such as DALL-E. This blogpost explains how to run a generative AI model on your own computer and create images using prompts. Hint: You also need a very strong GPU."
id: "blog"
date: "2024-01-17"
author: "Robert Czanik"
canonicalUrl:
audio: []
series: []
# images:
#     - "img/blog/original.jpeg"
#     - "img/blog/anime1.png"
#     - "img/blog/anime2.png"
tags: ["genai", "machinelearning", "images", "Stable Diffusion"]
videos: []
---
## What is generative AI and why use it?

In this blog post generative AI is introduced, specifically one of the most popular prompt-to-image packages: Stable Diffusion.
First of all, the question is what is generative AI: Generative AI is software that uses some form of input from a user to generate content using a deep learing model.
The input is usually given as text, in the form of a prompt which specifies the description of the type of content that you want to generate.
Output generated is usually in some form of media that can be viewed or intepreted by a person in either the form of text, images or in some of the latest generation of Gen-AI models video.

Now with a bit of a definition on what Gen-AI is what it does, I am going to give a bit of a summary on how fun it is to play around with some prompts on one of the most popular image-generating AI: Stable Diffusion.

## What is Stable Diffusion, who developed it, and why should you care

One of the most popular image Gen-AI packages is called Stable Diffusion, which takes in text prompts and generates images according to the prompt from a chosen specific model.
The package was developed by the company [Stability-AI](https://stability.ai/), who strives to develop the largest Open Source generative AI models, or packages for general public use.
Founded in 2019, they were the original developers of the Stable Diffusion model where images can be generated from prompts.
The secret sauce that make Stable Diffusion quite popular is that the model is open-source, meaning that one run it on one's local hardware (if you have a computer with a very strong GPU) or use openly - that is if the specific model is released under an Open Source licence.
In addition to it being Open Source is the model quite fast and accurate if compared to previous models that genrated images from text prompts.
The underlying technology that makes Stable Diffusion so fast is that all images on which it was trained are compressed to a latent space meaning that the generation is not done directly in the image space.
Implying that the model takes up less space in memory than directly storing the compressed images in memory.
For a deep explanation of the underlying technology, see the [blog post](https://techvify-software.com/what-is-stable-diffusion/).

Now, with this generative AI models being available to the general public, why should you care?
It would be wise to become familiar, or at least being aware of this technology as it is pretty powerful.
This type of technology speeds up the development of visual content for blog posts, content creation, prototyping products, marketing for start-ups, or any other daily need for images could easily use this technology.
This type of technology is under my opinion as revolutionary as the transition from film to digital photography, or even the invention of the printing press.

## Where can you get it, and how to use it

One can very easily get the model and code for Stable Diffusion from Stability-AI's [website](https://stability.ai/).
The code is not too difficult to understand, but if one does not want the retrain a model or generate custom scripts here is a web-app that is user fiendly on github, [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui).
This specific web-app does all the config that you need for a GPU, if you are running on Mac or Linux all of the necessary file installations are done when you execute the webui.sh script. Note that this was not tested on Windows, but it looks as if it will also run there. Moreover, if one has an AMD based GPU then on Linux you would first have to install [ROCM](https://www.amd.com/en/products/software/rocm.html) and on Windows you would have to use Direct-ML, which can both be a challenge to setup.
An alternative popular option to AUTOMATIC1111's interface would be the [Comfy-UI](https://github.com/comfyanonymous/ComfyUI) web-app, which was not tested for this blog.

### Creating an image from a prompt

The first step to start playing around with Stable Diffusion, would be to download the code from github and execute the webui.sh script in a virtual Python environment, at the time of writing the latest version of the interface required Python 3.10.6.
Upon the execution of the webui.sh script the first time all of the necerary dependencies are installed and the basic model, Stable Diffusion 1.5 is downloaded from huggingface's website.
One can also download extra models from [huggingface's website](https://huggingface.co/stabilityai), there are various models that are retrained versions of the baseline Stable Diffusion model.
The reason that one would use other models than the regular Stability-AI's Stable Diffusion model is that baseline model does not always deliver the desired output for a specific type of image, for example one would like to render a pixar-style image of a certain prompt which a custom trained model would deliver the best output.
The user-interface of AUTOMATIC1111's webapp should look like this:

{{<img src="/img/blog/user-interface.png" class="img-float" title="AUTOMATIC1111's web-app" width="650">}}

At the top, the specific model that is selected for the image generation is shown. The models are all stored in the directory of the code `models/Stable-diffusion/`.
The user-interface is quite intuitive, below the model selection pane there are tabs, of which the first two are only relevant to this blog; *txt2img* where a prompt generates an image, and *img2img* where one can give an image and a prompt as input and a new image is generated.
And then in the pane below the tabs one sees the tuning parameters for the model that are used for the render and to the right the rendered image is displayed at the end of the render.

{{<img src="/img/blog/stock-model.png" class="img-float" title="Selection of the model's checkpoint"  width="350">}}

For this specific excercise I wanted to see what a typical model would render if given the prompt for an Anime style image of a machine learning engineer (or more precisely how it would render an anime image of myself.)
I started playing around with the baseline model, and quickly discovered that it does not do very well trying to render anime style of images. So after searching around online for the best models for this type of output, I settled on the *protogenV22Anime* model.
When creating an image one has to try and keep it to a size of *512 x 512* pixels, otherwise the generation process takes up an extensive amount of video memory.

One thing to note here is that the models typically take up gigabytes of video memory, and if your GPU does not have enough memory to load the model you will not be able to use the models.
I ran these models on a MacBook Pro with a M3 Pro CPU and 18 GB of shared memory between the GPU and the CPU, so it would not be an issue even is one used a specifically large model.
For rendering images from prompts there are two parameters that are very important: The CFG scale and the sampling steps. The CFG-scale, or *classifier free guidance*-scale determance how strictly the Stable Diffusion model follows the prompts.
While the sampling steps are the number of repetitions that the model uses to generate an image from the prompt.
I used a CFG-scale of about 5.5 and sampling rate of 25 steps to generate a very impressive anime image of a machine learning engineer:

{{<img src="/img/blog/txt2img.png" class="img-float" title="The generated anime image of a machine learning engineer from stable difussion." width="450">}}

The prompts used were: *old school anime style image of a machine learning engineer, working on a macbook pro, glasses, goatee,  blond hair, wearing a blue hoodie*.
The negative prompts: *unrealistic eyes, photo realistic*

### Altering an existing image

I was quite impressed with the image generation capabilites of a custom model from a prompt, so I was curious on whether I could alter an image using a model. For example, could I take a photo and turn it into an anime style image using a bit of prompt engineering and parameter tuning.
So I decided to use the following image of myself and turn it into an anime style image:

{{<img src="/img/blog/original.jpeg" class="img-float" title="A selfie, cropped to the *512 x 512* image size that would best work for an image-to-image render using Stable Diffusion."  width="450">}}

Before altering the image it was cropped to the ideal size of 512 x 512 pixles, this is also the same size of images rendered by prompt only due to memory and performance demands.
The basic Stable Diffusion model did not render good results of and anime version of the input image,  the *anything-V3* model was chosen due to it's broad range of capabilities of image rendering.

{{<img src="/img/blog/model-name.png" class="img-float" title="The choice of the model used for altering a photo to an anime version."  width="350">}}

One thing that is interesting in the naming of the model name shown above, is that the model is a pruned version of *anything-V3* is a slimmed down version which has any unnecessary artifacts pruned out.
This means that the model is optimised for size, specifically GPU memory.
If one wants to retrain the model, or make an altered version of *anything-V3* then one should use the full version, which is most cases takes up a few GB's more.

{{<img src="/img/blog/img2img.png" class="img-float" style="float:left" title="The user interface of AUTOMATIC1111's webapp when altering an existing image according to a prompt."  width="1200">}}

For altering an image the render parameters had the following values: *CFG-Scale=8, Denoising strenght=0.5* and a batch of roughly 65 images were rendered.
These values were chosen after reading up online a bit and doing a bit of *prompt and pray*-ing, which can be a bit of a time consuming exercise.
The two best resulting images are:

{{<img src="/img/blog/anime1.png" class="img-float" style="float:left; margin-right: 10px;" title="The best version of an anime image of the photo uploaded."  width="400">}}
{{<img src="/img/blog/anime2.png" class="img-float" style="float:left" title="A tougher version with sharper edges of the anime image."  width="400">}}

These images are relatively close to the original photo and it is quite impressive to someone like myself who has not a strong artistic talent.

Now, after quickly creating an image from a prompt and making different versions of a photo the question still remains: why should you care, or how can you benefit from it?
In the first place it is good fun to be able to use these models as an outlet of your creative side, but as a software/data/machine learning engineer there is more benefits.
If you are building a website or mobile app and you are in need of some visual content it can help you out if your budget is a bit on the tight side.
Or if you are a startup and need some visual content for either social media or a website these types of models can be very effective if need to generate content in a short period.
Currently Stability-AI are playing around with [text-to-video](https://stability.ai/news/stable-video-diffusion-open-ai-video-model) capabilities which at the time of writing can render short 4-second videos from prompts.
This is still in testing phase, but in the near future we may see full fledged films rendered by generative AI in film theaters and on streaming services.