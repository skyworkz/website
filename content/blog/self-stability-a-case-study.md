---
title: "Self-Stability: When an Immovable Scaler met an Unstoppable Scheduler"
description: "A Case Study"
id: "blog"
date: "2021-05-04"
image: ""
author: "Tom Kennes"
audio: []
images:
- "img/blog/autonomy.jpg"
series: []
videos: []
---

Self-stabilizing systems are everywhere. The strong nuclear force stabilizes electrostatic forces on an atomic level, supply counteracts demand in economic markets (in the long run) and even though you might feel a bit out of balance now and then, you are literally packed with millions of balancing forces and processes! What can we learn from it within IT? How should we be thinking about self-stabilizing systems within IT and where could it be beneficial? And what happens when scalers and schedulers do not communicate?

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">About self-stability</h2> {{</raw>}}
Self-stability comes in a variety of forms, but there are a couple of general elements:
- The system experiences changing dynamics over time
- These dynamics can push the systems into certain unwanted, inferior or instable states
- Depending on the exact or perceived state, a balancing force grows stronger when the state is further from an equilibrium

Take for example the humble pendulum (shown below). Its motion is dictated by the interplay of gravitational energy and potential energy and its equilibrium would be in the center. Depending on its distance from the center, gravity will pull it back to the center resulting in an increase in kinetic enery and speed. As it overshoots its equilibrium position, kinetic energy reduces again until the pendulum reverts direction again.
{{<raw>}}
<img src="/img/blog/pendulum.gif" title="pendulum"  class="img-fluid" alt="Responsive image" style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

Generally, air resistance or drag would ensure that the pendulum would follow damped oscillation, while iteratively decreasing its maximal distance from its equilibrium (amplitude). Without that balancing force, the pendulum would keep on swinging back and forth indefinitely.
{{<raw>}}
<img src="/img/blog/damped_oscillation.png" title="damped-oscillation"  class="img-fluid" alt="Responsive image" width=500 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

This is also why famous physicists are not afraid accepting some calculated risks:
{{<raw>}}
<div style="text-align: center;">
<iframe src="https://giphy.com/embed/qrlOmXoTgHAd2" width="480" height="297" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/qrlOmXoTgHAd2" tyle="margin-left: auto; margin-right: auto; display: block;">via GIPHY</a></p>
</div>
{{</raw>}}

A more practical example of a self-stabilizing system, also a bit more goal-oriented than the simple yet delightful pendulum, would be a rocket navigating to the Moon. See the image below (not at scale). You start off on some initial trajectory, and every time you deviate from it, you quickly use your boosters to get back on track and sort of re-calibrate. Easy enough!
{{<raw>}}
<br>
<br>
{{</raw>}}
If you are controlling that rocket from Earth, you might be dealing with a bit of noise regarding your measurements. For example, your measuring equipment might not be perfect, and the signal itself might also experience some lag because it needs to all the way travel back home. This is not just a problem for rockets finding their way in outer space, but for many positioning systems in general. Luckily, we can solve this issue by continuously estimating our position based on past estimations and their actual accuracy. If you are curious how to deal with this kind of uncertainty, the {{<raw>}}<a href="https://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/">Kalman filter</a>{{</raw>}} would be a great place to start. Anyhow, let's stray away a bit from theory and get into why self-stability might be interesting for you!


{{<raw>}}
{{<img src="/img/blog/self-stability-001-kalman-rocket.png" title="kalman-rocket"  width="1000" height="600" class="img-fluid" alt="Responsive image">}}
{{</raw>}}

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">Self-Stability and IT</h2> {{</raw>}}
If you are working in the broad field of IT, chances are high that you are involved with some form of workload balancing. Whether you are figuring out how to optimize your data analyses, ETL-pipelines, build- or site-performance, or more elementary aspects such as multi-threading, you must have realized at some point that your resources are actually limited. Yes, cloud providers such as AWS, Azure and GCP might be able to provide virtuallly unlimited resources, your funds are generally not limited. (Also see posts such as {{<raw>}}<a href="https://mijailovic.net/2020/03/28/azure-money-burning/">this one</a>, or <a href="https://morioh.com/p/aa6f5978232e">this one</a>{{</raw>}}).

Actually... If you are struggling with this, there is {{<raw>}}<a href="https://skyworkz.nl/">this awesome company</a>{{</raw>}} that could help you with that!  (Okay, sorry. This is the only shameless self-marketing in this post, I promise! 😁)

Anyhow, if you are concerned with budgetary- or organizational constraints, you either ought to be thinking about organizing your workload differently to make better use of the infrastructure at hand, or about making your infrastructure better match your demand. Even if you are currently not thinking about this, if your application, tool or product is succesful right now, at some point you probably will.

Next to that, you might be looking at a system that scales according to demand, in order to save costs. That is, a system that scales up during demand peak hours and scales down again afterwards. If you are for example running a webshop, you might scale up to 2-5 instances to serve customers during the day and scale down to only 1 at night when times are quiet but you still need to accomodate the occasional late nigth shopping-spree. Nowadays, with the rise of Kubernetes and Auto-Scalers, this has become more the norm than the exception. Almost all systems with dynamic workload or demand, make use of some form of automated scheduling and scaling. Either through containers and pods by employing Kubernetes, or through virtual machines (VM) by using vendor-specific VM automatic scalers. With the advent of Kubernetes-as-a-service through GCE, EKS and AKS, you also no longer need to be a sysadmin to make use of these sort of tools. With those modern cloud providers, for VMs this is often even easier to set up!

It is however not all fun and games. If some components of a system are able to scale up dynamically and others can't, you still might run into stability issues in the end!

For example, if you restrict storage and dynamically provision I/O throughput, it's not at all unlikely that you will run into storage issues later on. Next to that, if you are taking a multi-dimensional balancing approach, where multiple components work with their own scalers and schedulers, you might run into a broad range of different issues. Especially when those 2 components are not really communicating with one another.

Also, it might not always be very clear where your system could suffer from potential stability issues since having multiple dynamically scalable components does generally not aid in the traceability of your issues. Next to that, if you do not prepare by analysing for potential weakspots beforehand, they will always surprise you later on, which is exactly the problem: {{<raw>}}<strong>when self-stability is lost in your production environment, you might be up for a bumpy ride</strong>{{</raw>}}.

This is actually what happened to us:
- We used Kubernetes for scheduling workloads on an x amount of cluster-nodes
- and the AWS Auto-Scaler for scaling those underlying cluster-nodes
- within a multi-AZ setup.
- These 2 did not communicate, at all...
- At some point the system became so instable, that it became mathematically impossible for the system to self-stabilize.
- And we had to rollback all of our systems. Sorry Neil...
{{<raw>}}
<div style="text-align: center;">
<iframe src="https://giphy.com/embed/woTl9H73tpebS" width="480" height="271" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/neil-degrasse-tyson-pendulum-woTl9H73tpebS">via GIPHY</a></p>
</div>
{{</raw>}}

Let's dive in!

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">When an Immovable Scaler met an Unstoppable Scheduler</h2> {{</raw>}}
At first sight, the setup might be quite simple: we are using Kubernetes to schedule pods using Deployments and the underlying nodes are automatically scaled using the AWS Cluster Auto-Scaler. Next to that we are running a Multi-AZ infrastructure, because workloads should not be impacted by issues at AWS. E.g. we want high availability.

Regarding the deployments:
- We are running 3 types of deployments.
- Deployment A consists of 2 pods in every AZ.
- Deployment B and Deployment C consist of one pod in every AZ.
- The sizes of the respective pods are similar, whether they belong to Deployment A, B or C.
- Pods are long-lived. Because we are HA, they are allowed to go down now and then, but in general they are necessary to be able to process the workload coming towards the cluster.

Regarding the workloads landing on those pods:
- Workloads belong to a certain deployment and can only be handled by its respective pods.
- Workloads are handled by a pod one-by-one. Before that, they remain in a queue.
- Workloads are somewhat AZ-agnostic. The limiting factor here is the underlying store (EB) being bound to the AZ. But if the workload does not need storage, which we generally don't know nor control, then there would be no issue.
- Workloads can be quite big, requiring several GB of memory and several CPUs
- Next to that, spill-over effects of pods to other pods should be avoided at all costs. If one workload, accidentally or not, bursts it should not impact others. E.g. we want small failure domains/blast radii.

Other constraints:
- We are also running a tight budget. Our colleagues from Finance are happily using Cloud cost explorers to scrutinize us. They are literally breathing in our neck. Well, figuratively, okay. It's a bit difficult to breathe in someone's neck these days.
- The maximum number of nodes within our NodeGroup is set at 15.

For these reason we made the decision to size our nodes in such a way that only one pod can land on it. {{<raw>}}<strong>E.g. the size of the pods equals the size of the node.</strong>{{</raw>}} In hindsight that might have been a mistake, and we have been told more than once that it is not really the way to go with Kubernetes as nodes should generally be a lot bigger than your pods. Even though that might well be the case, it would not have prevented our issues from happening.

Schematic, this would be the current status:
{{<raw>}}
<img src="/img/blog/self-stability-current-status.png" title="current-status"  class="img-fluid" alt="Responsive image" width=250 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

{{<raw>}}<h4 class="display-8">What we thought would happen</h4> {{</raw>}}
Then we were informed that there would be more demand for A and less demand for B and C for the following days, so we decided to make some changes. This is what you would expect to happen:
{{<raw>}}
<img src="/img/blog/self-stability-target-process.png" title="current-status"  class="img-fluid" alt="Responsive image" width=800 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}


{{<raw>}}<h4 class="display-8">What Actually Happened</h4> {{</raw>}}
However, this is not exactly what happened. We actually witnessed the following:
{{<raw>}}
<img src="/img/blog/self-stability-actual-status-1.png" title="actual-status-1"  class="img-fluid" alt="Responsive image" width=950 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}
{{<raw>}}
<img src="/img/blog/self-stability-actual-status-2.png" title="actual-status-2"  class="img-fluid" alt="Responsive image" width=950 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

Let me break it down for you:
- Status 2 - Status 3, {{<raw>}}<strong>Cluster Auto-Scaler:</strong>{{</raw>}} the overall load on the nodes is relatively low, so we can break down one node. Let's take, hmm, the one with workload B in AZ-1!
- Status 3 - Status 4, {{<raw>}}<strong>Kube-Scheduler: </strong>{{</raw>}} A pod of Deployment B got evicted, let's get it back up in AZ-1. Ah, there are no more nodes available! Better ask for more nodes!
- Status 4 - Status 5, {{<raw>}}<strong>Cluster Auto-Scaler:</strong>{{</raw>}} did somebody say more nodes? Here you go, it is ready for you in AZ-2.
- Status 5 - Status 6, {{<raw>}}<strong>Kube-Scheduler: </strong>{{</raw>}} I am still waiting for a node in AZ-1...
- Status 5 - Status 6, {{<raw>}}<strong>Cluster Auto-Scaler:</strong>{{</raw>}} Ah, you need more nodes. Let me take down this node with worload C in AZ-2.
- Status 6 - Status 7, {{<raw>}}<strong>Cluster Auto-Scaler:</strong>{{</raw>}} There you go, I have put another node ready for use in AZ-3.
- Status 6 - Status 7, {{<raw>}}<strong>Kube-Scheduler:</strong>{{</raw>}} A pod of Deployment C got evicted, let's get it back up in AZ-2. Ah, there are no more nodes available! Better ask for more nodes!

{{<raw>}}<h4 class="display-8">Why does this happen?</h4> {{</raw>}}
The reason why this occured is two-fold. First the Cluster Auto-Scaler is not zone-aware, it does not know in which zone a specific node is running and does not communicate with Kubernetes in which Zone a node should be added. Next, the Cluster Auto-Scaler is unable to decide which node should be taken down. There are a couple of options that influence this, but in this specific case, given the unpredictable nature of our workloads, this is nearly impossible.

Next to that, there are a couple of factors that contribute to the probability of such an event unfolding. The fact that pods and nodes are of the same size, as well as the limit of the NodeGroup, makes a conflict between these two scalers/schedulers more likely to occur. In a sense, the pod and the node become the same object and are simultaneously managed by two different tools that do not communicate. It's like a disaster waiting to happen. On the other hand, if the Cluster Auto-Scaler would have accidentally removed a node in the right Availability Zone, than there would not have been a probem at all. In fact, in theory there are even scenarios where this system could recover and transition into the stable target state.

{{<raw>}}<h4 class="display-8">How to deal with these situations?</h4> {{</raw>}}
So here is the thing. I am a mathematician at heart and whenever I encounter a problem that could be solved using my Math-Toolbox, I usually give it a go. Next to that, I believe it is helpful to look at these problems from a mathematical angle in order to figure out what would be beneficial for the system. Having said that, the first thing that this problem, with its states and probability-dependent transitions, reminds me of are {{<raw>}}<a href="https://en.wikipedia.org/wiki/Markov_chain">Markov Chains</a>{{</raw>}}. This statistical model is among others used to analyse discrete decision-making processes, queueing, gambling processes and stochastic simulations (see {{<raw>}}<a href="https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo">Markov Chain Monte Carlo</a>{{</raw>}}).

In essence, the model defines states and transitions between states. In this case, a state would be an allocation of nodes among AZs and workloads on those nodes. Given that workloads are always scheduled if possible, we can focus on transitions based on changes in nodes only. A transition would then be the removal of a node in one of the AZs and the addition of a new node in one of the AZs. The removal of nodes is triggered by an overall lowered workload on the all the nodes and using a couple of heuristics and requirements involving the re-shuffling of workloads, one of them is removed. However, because the workloads are dynamic, we end up with a somewhat random process. E.g. each node is equally likely to be removed. This also simplifies later calculations!

Next to that, since the Cluster Autoscaler is not zone-aware, it not necessarily puts new nodes in the right AZs. It is not really clear what heuristics are used here, but there are options that stipulate a balancing of nodes across zones. Since we are not using that, it is safe to assume that the AZ in which nodes are added again is random, simplifying calculations again.

If you would map these states and transitions out for the first state and transition, after the 2 workloads were evicted, you would get the overview below. Note that the P_* indicate probabilities of ending up in a certain state. In our case, when each node is equally likely to be removed, these probabilities will be equal. That is: 1/15 (since they need to sum to 1).

{{<raw>}}
<img src="/img/blog/self-stability-mcmc.png" title="model-state-space"  class="img-fluid" alt="Responsive image" width=950 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

Right away, you can see that there are 2 states that are actually in the right direction. That is, the 2 states that remove the correct node which was already free. So from here you could also theoretically deduce that the probability of ending up directly in the right space, should be about 1/15 * 1/14, as you would have one node less in the next transition.

Nice, so we know one way the process could end up in the desired target state! But there are of course many more. What is probability that it first drop the wrong node and then quickly recovers and does the right thing after all? What about 2 wrong nodes? Etcetera. You see, these issues become increasingly complex once the range of possible values becomes larger. In our case, each node could in theory be in any of the 3 zones. If you would multiply those for each node, you would get a total number of 3^15 permutations (about 14.3 million).

When facing these large probability domains, there are essentially 2 things you can do:
- Look for ways to make the probability space smaller by eliminating impossible states, figure out some obscure math or discover some sort of useable pattern in order to divide and count more intelligently. This is not only generally quite difficult, it might also be impossible in some scenarios.
- Simulate using the {{<raw>}}<a href="https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo">Markov Chain Monte Carlo</a>{{</raw>}} method! You could also run several million/billion times this experiment and count the number of steps needed to reach the target state (if it was reached). Whereas this would be quite a daunting task several decades ago, nowadays you only need a laptop and some knowledge about how to code up your simulation. This is also what I did: {{<raw>}}<a href="https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo">github__ADJUST_LINK</a>{{</raw>}}

{{<raw>}}
<br>
<br>
{{</raw>}}
