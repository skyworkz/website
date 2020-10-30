---
title: "Waypoint! What point?
"
description: "Hashicorp Waypoint"
summary: 'In October 2020, HashiCorp re-entered the space of DevOps and CI/CD by releasing the first version (v0.1) of Waypoint. The tool focuses heavily on developers, claiming that: "Developers just want to deploy!". In this blog post, the primary value of DevOps and CI/CD is explained as a better balancing of agile development efforts and stability-focused SRE efforts. Holding on to this train of though, there currently are a couple of caveats that either need to be addressed by organisations looking to adopt Waypoint v0.1, or require some attention from HashiCorp. 
'
id: "id"
date: "2020-10-28"
author: "Tom Kennes"
audio: []
images:
- "img/blog/waypoint_logo.png"
series: []
tags: ["hashicorp", "waypoint", "devops", "ci/cd", "continuous integration", "continuous deployment", "development", 'cloud']
videos: []
---
# Waypoint? What Point?
{{<raw>}}
<ul>
    <li>
        <a href="#Waypoint-released">Waypoint v0.1 Released!</a>
    </li>
    <li>
        <a href="#Saving-pigs">Saving Pigs</a>
    </li>
    <li>
        <a href="#Waypoint-demo">Waypoint Demo (Start reading here if you are only interested in Waypoint.)</a>
    </li>
    <li>
        <a href="#Waypoint-bigger-picture">Waypoint: The Bigger Picture</a>
    </li>
    <li>
        <a href="#Conclusion">Conclusion</a>
    </li>
</ul>
<a id="Waypoint-released"></a>
<br>
<br>
<br>
<br>
{{</raw>}}


{{<raw>}}<hr>{{</raw>}}
# Waypoint v0.1 Released!
{{<raw>}}<hr>{{</raw>}}
This month, HashiCorp presented their new open source project **Waypoint**! Waypoint provides a way to get applications built and deployed to several potential platforms. It builds your code into a container image using {{<raw>}}<a href="https://buildpacks.io/">CNCF Heroku Buildpacks</a>{{</raw>}} or docker and subsequently deploys it onto your preferred platform (currently it supports Kubernetes, HashiCorp Nomad, Amazon ECS, Google Cloud Run, Azure Container Instances and Docker). Next to that, it is fully extendable using a plugin system that would allow Waypoint to work with any tool or platform. Targeting developers in medium- or larger-sized organisations working with complicated environments and steep learning curves, they intend to help developers from non-development work for the simple reason: "Developers just want to deploy!"
{{< raw >}}
<br>
<br>
{{< /raw >}}

In this (somewhat opinionated) blog post, I first would like to take it a step back and look at the problem the area of CI/CD/DevOps has been trying to solve within Product Development. Then I shortly demo Waypoint and go over some of its capabilities including its UI. Finally, I conclude this blog post by analysing whether Waypoint helps solving these problems in the organisations they are targeting (e.g. medium- to larger-size organisation).
{{< raw >}}
<br>
<br>
{{< /raw >}}

With that I mind, let's get into it!
{{< raw >}}
<a id="Saving-pigs"></a>
<br>
<br>
<br>
<br>
{{< /raw >}}


{{<raw>}}<hr>{{</raw>}}
# Saving Pigs
{{<raw>}}<hr>{{</raw>}}
*"You can’t just throw the pig over the wall to us, and then high-five each other in the parking lot, congratulating yourselves on how you made the deadline. Wes is telling us that the pig will prob-ably break its leg, and it’ll be my guys who work all-nighters and week-ends to keep that pig alive."*
{{< raw >}}
<br>
{{< /raw >}}
**Bill Palmer - The Phoenix Project**
{{< raw >}}
<br>
<br>
{{< /raw >}}

If you recognize the snippet above, you must have already made your way into CI/CD and DevOps, or perhaps you have spent some time in animal husbandry. Yet it might also be well the case that for you it does not really resonate with DevOps. Ask a system engineer, a developer and a manager about DevOps and you will get 3 completely different answers! DevOps and CI/CD have become part of the IT organisation as a whole and depending on where you stand within that field, it might have touched your work in various different ways. Let's however take a step back and take a closer look at its core values.
{{< raw >}}
<br>
<br>
{{< /raw >}}

Whereas product development focuses on features and require agility, large scale systems demand stability in operating. There is this fine balance between agility and stability. Focus too much on features, and your pigs will break their legs once they are thrown over the wall. Focus too much on stable infrastructure and your pigs will not attract that lucrative business. Compare this to financial investments, where we are trying to maximize the expected value (feature development) of our portfolio while simultaneously minimizing risk (or instability). 
{{< raw >}}
<br>
<br>
{{< /raw >}}

In the ideal world, we would like to have both and in many ways this is exactly what we have been trying to accomplish over the last decade. We have merged both agility and stability requirements within one team, and authorized them to take up responsibilities in order to find that balance themselves. The resulting left-shift of infrastructure responsibilities gave rise to multi-disciplinary Dev-Ops teams, whose focus on shortening release cycles using CI/CD enabled resulted in more stable iterations as well. Business leaders and management also have been playing a pivotal role in this process. By fostering trust, allowing teams to make more mistakes and focusing on defining business value, they ultimately decide the balance between short-term agility and long-term stability.
{{< raw >}}
<br>
<br>
{{< /raw >}}

In turn this gave rise to a whole range of tools focusing on flexible infrastructure (IaC), automated builds and testing (CI) as well as the automation of deployments to production environments. In essence, these tools aid in keeping the stability of the system in check, while allowing features to move forward as fast as possible. Each of these tools do so in a different way. If combined with the Cloud, tools like Terraform or Ansible (IaC) enable infrastructure to be more dynamic while keeping a close eye on its stability. On the other hand, CI keeps agility in check by baking stability requirements into development (e.g. builds and tests). Finally, CD has a major impact on stability, if done properly. Given that release cycles are appropriately short, it prevents drift between production and development environments and helps identifying breaking changes.
{{< raw >}}
<br>
<br>
{{< /raw >}}

Most of these tools are pretty awesome, to say the least, and developers and operations engineers alike have been very keen to adopt them. However, unlike propagandists or salespeople might say, the usage of these frameworks and tools is not a silver bullet. The balance between stability and agility differs per company and even per project. Working with sensitive data or legacy systems might require more stability and might benefit the most from a well-organised structured approach. Small innovation-focused projects like POCs, POVs or spikes need something somewhat valuable somewhat fast and might be able to take on more risk. One of the biggest challenges in all these projects and teams is finding THEIR right balance, allowing THEM to achieve THEIR highest velocity. 
{{< raw >}}
<br>
<br>
{{< /raw >}}

Sometimes this involves some sort of trade-off. For example, let's say you are paying Heroku to deploy your website. Then you do not have to worry about stability, since everything is managed for you, but you will also be more limited in your options and thus your bigger picture will include less agility.
{{< raw >}}
<br>
<br>
{{< /raw >}}

I like to take the same stability-versus-agility approach when assessing the value of new tools or frameworks in IT and ask questions such as: How much does this speed up my development process? Is it possible to bake in best practices such as developer reviews and testing? How much does it automate away? Does it introduce new risks that require additional action? Etcetera.
{{< raw >}}
<br>
<br>
{{< /raw >}}

Let's continue before I digress. As the title and introduction suggest, HashiCorp has entered the field of DevOps/CI/CD by introducing their new tool called Waypoint. Let's see what it is and whether its value could be leveraged!
{{< raw >}}
<a id="Waypoint-demo"></a>
<br>
<br>
<br>
<br>
{{< /raw >}}


{{<raw>}}<hr>{{</raw>}}
# Waypoint: Short Demo
{{<raw>}}<hr>{{</raw>}}
But first; let's step into a typical Waypoint user according to HashiCorp. E.g. I am a developer and I just want to deploy!
{{< raw >}}
<br>
<br>
{{< /raw >}}

To start off, you need to install {{<raw>}}<a href="https://docs.docker.com/desktop/">Docker</a>{{</raw>}} and a {{<raw>}} <a href="https://learn.hashicorp.com/tutorials/waypoint/get-started-install?in=waypoint/get-started-kubernetes">waypoint server</a> {{</raw>}} though... 
{{< raw >}}
<br>
<br>
{{< /raw >}}
And then, deploy!
{{< raw >}}
<br>
<br>
{{< /raw >}}

Right, so... What do we need? Waypoint requires you to write a .hcl-file (HashiCorp Configuration Language, a mix between JSON and YAML), define a build, deploy and optionally also a release step in there. Here, deploying an application can be seen as staging it, whereas releasing covers configuration around it (load balancers, DNS, etc). 
{{< raw >}}
<br>
<br>
{{< /raw >}}

We thus define the waypoint.hcl file as indicated below. Note that you would put this file in the same repository as where you keep the code you intend to build/deploy/release. Also note that you do not have to provide specifics with regard to what sort of code or framework you are using, since this is automatically detected using the {{<raw>}}<a href="https://buildpacks.io/">Buildpacks</a>{{</raw>}}.
{{< raw >}}
<br>
{{< /raw >}}

```hcl
project = "example-nodejs"

app "example-nodejs" {
  labels = {
    "service" = "example-nodejs",
    "env" = "dev"
  }

  build {
    use "pack" {}
  }

  deploy {
    use "docker" {}
  }
}
```

Initialize the project and deploy using:
{{< raw >}}
<br>
{{< /raw >}}

```
$ waypoint init
$ waypoint up
```
{{< raw >}}
<br>
{{< /raw >}}

Waypoint will then log the build and several steps in the deployment and finally output a URL where you can reach your now live application. Easy!
{{< raw >}}
<br>
<br>
{{< /raw >}}

{{<img src="/img/blog/waypoint_up.png" title="Waypoint Up" class="img-fluid">}}
{{< raw >}}
<br>
<br>
{{< /raw >}}

There are already a couple of options available for the build, deploy and release stages at the moment, and HashiCorp intends to provide more in the future. Additionally, you can write your own plugins.
{{< raw >}}
<br>
<br>
{{< /raw >}}

Currently, for the build-stage you either involve the {{<raw>}}<a href="https://buildpacks.io/">CNCF Heroku Buildpacks</a>{{</raw>}}, to automatically pack your code in a Docker image, or you provide your own Dockerfile. For the deployment-stage you can connect to the container platforms from the big cloud providers, your local kubernetes cluster or Netlify. Finally, you could also specify a release stage if necessary, otherwise the platform defaults will be applied (for Kubernetes a Service resource for example).
{{< raw >}}
<br>
<br>
{{< /raw >}}

Keeping track of these builds and deployments can become somewhat of a pain, especially with ever growing projects. That is why Waypoint comes shipped with a silky smooth UI where you can inspect builds, deployments, releases and their respective logs.
{{< raw >}}
<br>
<br>
{{< /raw >}}

{{<img src="/img/blog/waypoint_ui.png"  title="Waypoint UI" class="img-fluid">}}
{{< raw >}}
<br>
<a id="Waypoint-bigger-picture"></a>
<br>
<br>
<br>
<br>
{{< /raw >}}

{{<raw>}}<hr>{{</raw>}}
# Waypoint: The Bigger Picture
{{<raw>}}<hr>{{</raw>}}
Truth be told, running ```waypoint up```, clicking the provided URL and seeing my application live, hosted by HashiCorp and with TLS in the place is a lot of fun, but let's try to stay critical here. There are a couple of limitations that might be interesting to take into account when you are considering taking up Waypoint within your organisation.
{{< raw >}}
<br>
<br>
{{< /raw >}}

### Security
As mentioned earlier, in order for Waypoint to work, you need to install a Waypoint server, where data containing information about earlier builds, deployments, releases as well as logs are stored. 
{{< raw >}}
<br>
<br>
{{< /raw >}}


Both the CLI and the UI authenticate to the server with tokens, which is not yet optimized for maintainability. A token gives access to all builds and deployments, but this does not imply that it would also be possible for the user to actually deploy. The build and deploy actions are executed locally when running ```waypoint up/build/deploy/release``` rather than by the server itself. This means that users require to have the credentials corresponding to the deployment platform locally, which might need some explanation towards your risk management department. The only type of access currently available is full access, so fine-grained RBAC access is rightfully present on the {{<raw>}}<a href="https://www.waypointproject.io/docs/roadmap">roadmap</a>{{</raw>}}. Same for a mechanism to revoke tokens, audit token usage, inspect an existing token, etc. 
{{< raw >}}
<br>
<br>
{{< /raw >}}

Next to that, Waypoint offers a way to store environment variables used in the containers it deploys. This can be pretty convenient, but unfortunately this data is without encrypted stored in its easily accessible database.
{{< raw >}}
<br>
<br>
{{< /raw >}}


### Quality Control
It is easy to go back to older build and deployments, analyse their logs and rollback failed deployments. It is even possible to exec into live containers and run commands there. As such, I have everything in place to debug my code, and clean up my mess AFTERWARDS! Indeed, in many scenarios you would prefer to avoid bugs creeping into production by testing throughly before deployment. Even though it is in theory possible to integrate this in the build-phase, with a deploy-fast attitude you are bound to run into problems at some point. Next to that, being able to exec into production is a power not to be underestimated. I am not completely against making modifications in production (some scenarios really require this), but best practice (and the overall trend) is to avoid this as much as possible.
{{< raw >}}
<br>
<br>
{{< /raw >}}




### Automation
As mentioned previously, Waypoint makes use of the {{<raw>}}<a href="https://buildpacks.io/">CNCF Heroku Buildpacks</a>{{</raw>}} to detect how the code should be packaged into a container image, and thereupon deploys that image using a container orchestrator of choice. Heroku essentially does a similar thing, only that it deploys and hosts for you as well. Instead, Waypoint sits somewhere in the middle between Heroku and fully in-house, because it does not take away the need to understand the platform you are deploying onto. For some scenarious this might be a perfect balance (see <a href="#Conclusion">conclusion</a>)

Keep in mind that developers might not need to understand containerization and infrastructure, but as an organisation you still need to rely on technical platform expertise when using Waypoint. 
{{< raw >}}
<br>
<br>
{{< /raw >}}




### HashiCorp Otto
One of the first things that might have come to your mind when reading about Waypoint, might the earlier HashiCorp deployment tool called Otto. Indeed, both tools seem to attempt to provide a solution for the same problem, and it is a bit suspicious that HashiCorp decommissioned Otto simultaneously with releasing Waypoint to the public. It is also important to note that Otto has not been very popular to begin with. The opensource community never really has embraced Otto, nor did it attain enough vendor support. Of course it remains to be seen whether Waypoint would be able to avoid the fat of Otto. 
{{< raw >}}
<br>
<br>
{{< /raw >}}

It is however important to note that even though they are similar products, they have been built with different philosophies in mind. As such, Waypoint does not manage any infrastructure, whereas Otto made an attempt to do so. With Waypoint you have to bring the infrastructure yourself. Next to that, Otto focused mainly in other HashiCorp tooling, whereas Waypoint has pluggable components for build, deploy and release. With the inclusion of URLs, exec and the UI, Waypoint focuses much more directly on application developers rather than DevOps professionals.
{{< raw >}}
<a id="Conclusion"></a>
<br>
<br>
<br>
<br>
{{< /raw >}}



{{<raw>}}<hr>{{</raw>}}
# Conclusion
{{<raw>}}<hr>{{</raw>}}
Even though Waypoint presents itself as a solution for medium- and larger-scale organisations, if you are a sizeable organisation there are tools in the market that might suit better (personally I am a huge fan of Azure DevOps). To a single "developer who just wants to deploy" it might be a wonderful tool, but larger scale organisations should also assess the potential risk it could introduce as well as take into account that you still depend on technical expertise regarding your deployment-platform when using Waypoint.
{{< raw >}}
<br>
<br>
{{< /raw >}}

With regard to balancing stability and agility, Waypoint offers some nice shortcuts for developers as well as an integrated UI to keep track of earlier builds and deployments, but this increased agility does not leave stability unaffected. On the contrary, whereas HashiCorp's documentation clearly stipulates that it intends to let developers just deploy, it does not offer any tools to do so with stability of the product and production environment in mind and might even introduce (or re-introduce) deployment- and release-related work in the semi-long run.

In a scenario where taking these shortcuts is justified and less care is required for infrastructure, mitigating risks and guaranteeing stability, Waypoint might be an excellent option. If you already have a cluster set up, and you would like to quickly test how the application would behave in the cluster, Waypoint might be an excellent option. Or, if you are responsible for a cluster and are looking for more internal applications to be migrated to your cluster, Waypoint might be a convenient way to start getting more developers on board.

On the other hand, in scenarios where both features and infrastructure are heavily developed, as in commmon the case in projects adopting DevOps, I would strongly advise against using Waypoint v0.1. It might lead to stronger separation of Dev and Ops, because it abstracts infrastructure away for developers, and hence goes against core values of DevOps (see {{<raw>}}<a href="#Saving-pigs">Saving Pigs</a>{{</raw>}}).
{{< raw >}}
<br>
<br>
{{< /raw >}}

When combined with other products form the HashiCorp ecosystem, Waypoint might be able to offer some interesting opportunities. In the documentation, HashiCorp already hints that they envision a complementary symbiotic relationship for Waypoint and Terraform in the future! If a tool like Vault could be used for token management, that would be even more awesome!
{{< raw >}}
<br>
<br>
{{< /raw >}}

Overal, there is room for improvement, but I like where Waypoint is going. HashiCorp is actively developing the product and has already laid out a {{<raw>}}<a href="https://www.waypointproject.io/docs/roadmap">roadmap</a>{{</raw>}} displaying some of their intentions. If they manage to get backing from the open-source community to buy into their idea, I am certain that I will have to revise some of these comments in the future!

