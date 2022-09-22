---
id: blog
title: Reliable codified development setups with GitPod
description: Local development setups are hard, and they often don't age well. This blog
  outlines how you can fix that with codified cloud-based development setups using GitPod
author: Benny Cornelissen
tags:
  - cloud
  - coding
  - productivity
slug: reliable-codified-development-setups-gitpod
date: 2022-09-19
images:
  - "/img/blog/gitpod-illustration.png"
---

Local development is hard.

Yes, if you pour enough time into it, you can have local setups that work fine, some might even be elegant. But not everyone has that kind of time, and not every project warrants it.

Too often I find that in order to contribute to an open source project, I first have to set up all kinds of stuff to even get started. And it's one thing if it's a project that I use a lot, and have intimate knowledge of, and is built on a tech stack I'm good at. Because that'll probably mean that it's fairly straightforward to get the development setup working properly, and it will also be worth the time I put into it.

But it might also be the Skyworkz blog. Writing a blogpost like the one you're reading right now _should_ be about getting the content down. It _should_ be mostly about writing some Markdown. But it's not. In order to contribute I need a working setup of our CMS (in the appropriate version), I need to 'NPM install half-the-internet' for some frontend stuff I know very little about, and the rabbit hole goes from there. As a result, people didn't quite feel like contributing as much, or they would just write the Markdown, push it, and hope for the best. Obviously, that's not ideal, so we need something better.

## Codifying the development setup
The first thing we want is to 'codify' the development setup. A `README` file that tells you to install a bunch of things and then run some arbitrary commands isn't good enough, and is also very prone to becoming outdated. One of the simplest approaches would be to have a `Dockerfile` that provides a repeatable environment for at least running your code.

But why stop there?

Ideally, a codified development setup for projects I don't touch often would offer me the following things out of the box:

1. Dev runtime: a means of running my code while developing
2. Automated validation of project guidelines: if a project has certain standards for formatting, repo structure, or commit messages, the codified development setup should assist me here
3. IDE config: a recommended IDE setup for a project makes it extremely easy dive into it and contribute

A combination of a purpose-built `Dockerfile`, a [devcontainer](https://containers.dev), maybe some [pre-commit](https://pre-commit.com), and adding a `.vscode` folder with some config would get you a long way here.

But why stop there?

## Development does not have to be local
It's often assumed that development is something that has to happen locally. You have your IDE, your code, and the development runtime all on your computer. But what if we take away that constraint too? What if our local OS doesn't matter? What if the specifications of our laptop don't matter? What if we don't have to run a Docker runtime or specific tech stacks locally? We could suddenly contribute to software projects without installing _anything_ and from any device, even if it's a ChromeBook, an iPad, or a corporate Windows machine that you don't have any admin privileges on.

The past few years we've seen a few developments in this area, with notable examples being [GitPod](https://www.gitpod.io) and [Github Codespaces](https://github.com/features/codespaces). These both take a very similar approach:

- offer a web-based IDE based on VSCode
- run a cloud-based workspace (that also hosts the web-based IDE)
- allow for customization via standard VSCode config, container images, and specific configuration (e.g. GitPod tasks)
- expose the entire thing on the public internet
- integrate with VSCode desktop app via plugins
- SSO via Github (among others)

This means we can offer a reliable codified development experience for our projects, that make it easy to start collaborating without having to install or configure _anything_. All you need is a Github account.

I tested both extensively over the past years, but eventually settled on GitPod as my preferred option for several reasons:

- GitPod supports all major Git providers (Github/Bitbucket/Gitlab) but isn't owned by any of them
- GitPod allows for a self-hosted setup
- GitPod is _very_ configurable, while testing it offered more than Codespaces did
- GitPod integrates with [Tailscale](https://tailscale.com) out of the box
- GitPod offered more clarity on their roadmap than Microsoft/Github did, who have made several strategic pivots over the past 2 years

## Creating a codified development experience for the Skyworkz website
As you've probably figured out by now, we are using GitPod for our website these days. But how did we do it, and what does it even mean? And can you still develop without it?

To start with the last question: yes, you can still run a local setup like you could before. But you probably don't want to, since the GitPod setup offers everything you need right out of the box:

- Custom workspace container image that includes the correct version of Hugo
- Automatically run Hugo server with a custom URL for your workspace so you can immediately preview your changes in a live website
- Automatically install required VSCode extensions
- Correct VSCode settings

Most of this will be configured in the `.gitpod.yml` file that you can put in the root of your Git repo.

### Custom container image
GitPod offers several flavors of their 'workspace' Docker image that you can extend with whatever you want. If you're unsure which one to use, the safe approach is to use the full-featured `gitpod/workspace-full` image and go from there. It will be quite large, so starting up workspaces will not be as fast as it could be, but it's a great starting point.

Our custom Dockerfile is named `.gitpod.Dockerfile` but you can name it whatever you like, as long as you reference the correct file in `.gitpod.yml`:

```yaml
image:
  file: .gitpod.Dockerfile
```

### Tasks and ports
We got into this because running development setups is hard, so obviously we want to fix the out-of-the-box experience properly. All the necessary NPM stuff needs to 'just work', and our GitPod workspace needs to automatically run a Hugo server that we can access to preview our changes. We can fix that by configuring the appropriate tasks, and by opening a port.

By default, Hugo runs on port `1313` so we need to expose that. GitPod is a little specific about how it exposes ports, though. For starters it _only_ exposes HTTP(S) type traffic. It also doesn't actually expose _that_ port. So we're not getting `http://<some url>:1313`, but we're getting `https://1313-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}`. By default the port is exposed 'privately' which means you need to be authenticated to GitPod (for instance using Github SSO) to open the URL, but you can configure a port to be 'public' if you want anyone with the URL to be able to access it. You can also configure what should happen in your IDE when the port is exposed. For example, it can prompt you to create a port-forward, so you can access the port on `localhost:<port>`. In our case, we don't want that, so our port configuration looks like this:

```yaml
ports:
  - port: 1313
    onOpen: ignore
```

Now back to running things automatically. We basically need 2 things to happen:

- NPM stuff for frontend (`npm install`) which can be done as part of a [Prebuild](https://www.gitpod.io/docs/prebuilds)
- Running a Hugo dev server

GitPod supports 3 types of task, that all behave differently:

- `before`: used for tasks that need to happen before everything else
- `init`: typically used for heavy lifting, downloading dependencies, compiling, etc. Init tasks are also run in the background for GitPod workspaces as part of 'prebuilds' which means that you typically won't have to wait for them when opening a workspace
- `command`:  used for things that need to happen when opening a workspace, like running a Hugo dev server

Hugo expects you to configure a base URL when running a server, but GitPod uses randomized hostnames for workspaces. Fortunately, it exposes them as environment variables, so you can actually use the URL like I mentioned above when running Hugo.

Consequently, our tasks configuration looks like this:

```yaml
tasks:
  - init: npm install
    command: hugo serve --baseURL https://1313-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}/ --appendPort=false
```

### VSCode plugins and settings
Finally, we can make life easier for people by offering a properly configured IDE, in our case this IDE is VSCode. We want several plugins to be present, and we can configure all kinds of editor behaviour in default VSCode config files by simply adding a `.vscode` directory to our Git repo.

You can configure 'recommended' plugins in `.vscode/extensions.json` but with GitPod it's recommended to configure plugins in `.gitpod.yml` as it will cause these plugins/extensions to be automatically installed rather than just being recommended. Configuration for VSCode extensions in `.gitpod.yml` looks like this:

```yaml
vscode:
  extensions:
    - eliostruyf.vscode-front-matter
    - bungcip.better-toml
    - budparr.language-hugo-vscode
    - ms-azuretools.vscode-docker
```

## Tying it all together
GitPod provides a very simple means of opening any (public) repository in GitPod. You simply navigate your browser to the Magic URL:

```
https://gitpod.io/#https://github.com/your/repo
```

This also means you can directly link to GitPod from your `README`. Now, everyone at Skyworkz can simply click a link and get a fully functional dev setup, right in the browser. Or, if they want, they can [open the GitPod workspace in their desktop VSCode](https://www.gitpod.io/docs/ides-and-editors/vscode) as well.

{{<img src="/img/blog/gitpod-ssh-vscode-website.png" class="img-fluid" title="GitPod development in desktop VSCode" >}}

## Trying GitPod for yourself
If you want to see what GitPod can do for your projects, it's pretty easy. For starters, you can use GitPod for free, and without having to sign up. Just use your existing Github/Gitlab/Bitbucket account, and open any repository you like using the Magic URL. That's all you need to do to get started. For private repositories you need to grant GitPod access to your Github/Gitlab/Bitbucket account.

For more information, check out the [GitPod website](https://www.gitpod.io).
