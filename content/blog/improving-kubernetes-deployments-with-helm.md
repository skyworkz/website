---
title: "Improving Kubernetes deployments with Helm"
description: "Helm is a package manager for Kubernetes. It can deploy multiple Kubernetes files and resources as a single package with a single lifecycle. One of the most powerful features of Helm is the templating. This makes it much easier to create templates that can be used by different teams for different purposes. This is especially interesting for templates such as mysql/stable. This Helm Chart can be used for many different purposes such as for a sandbox environment or for production usage. However, the templating can also be used for a few nice-to-have features for more simple deployments that are more homogeneous."
id: "blog"
date: 2019-03-15T09:27:21+02:00
image: "img/helm.png"
author: "Sander Knape"
canonicalUrl: "https://sanderknape.com/2019/05/building-serverless-applications-aws-cdk"
audio: []
images:
- "img/helm.png"
series: []
tags: ["AWS", "Kubernetes"]
videos: []
---

I recently blogged about [automated deployments to Kubernetes using GitLab](https://sanderknape.com/2019/02/automated-deployments-kubernetes-gitlab/). One of the steps required when automating deployments is replacing the Docker tag with the correct value in the Kubernetes Deployment. In that blog post, this looks like the following:

deployment.yaml
```yml
apiVersion: apps/v1
kind: Deployment
metadata: []
spec:
  template:
    spec:
      containers:
        image: sanderknape/go-hello-world:<VERSION>
```

The <VERSION> string is then replaced in the GitLab pipeline as follows:
```bash
sed -i "s/<VERSION>/${CI_COMMIT_SHORT_SHA}/g" deployment.yaml
```

This grabs the short SHA hash of the current Git commit that is checked out. Earlier in the pipeline, a Docker image has been built and tagged with that SHA, and pushed to a Docker registry.

The alternative of simply using latest would cause several issues. For example, performing a rollback from latest to latest would not work. In addition, using the SHA means that you always know exactly which version of the code is build into the container.

However, as I also mentioned in that blog post, I’m not too happy with having to use sed to replace the version into the deployment file. To me this is a sign that I’m either doing something that I’m not supposed to do, or that a feature is missing. As I’m following a best practice of not using the latest tag, I’m pretty sure that this is an example of the latter situation.

[Continue reading on Sander's personal blog](https://sanderknape.com/2019/03/improving-kubernetes-deployments-helm/#helm)
