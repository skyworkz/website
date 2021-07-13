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
The reason why this occured is two-fold. First the Cluster Auto-Scaler is not zone-aware, it does not know in which zone a specific node is running and does not communicate with Kubernetes in which Zone a node should be added. This is also a known problem, see for example the EKSCTL documentation by {{<raw>}}<a href="https://eksctl.io/usage/autoscaling/#zone-aware-auto-scaling">WeaveWorks</a>{{</raw>}}. Next, the Cluster Auto-Scaler is unable to decide which node should be taken down. There are a couple of options that influence this, but in this specific case, given the unpredictable nature of our workloads, this is nearly impossible.

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
- Simulate using the {{<raw>}}<a href="https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo">Markov Chain Monte Carlo</a>{{</raw>}} method! You could also run several million/billion times this experiment and count the number of steps needed to reach the target state (if it was reached). Whereas this would be quite a daunting task several decades ago, nowadays you only need a laptop and some knowledge about how to code up your simulation. This is also what I did.

> I will not go too much in depth here about how to set up these simulations. If you are interested, please take a look at my code {{<raw>}}<a href="https://github.com/tkennes/self-stability">github</a>{{</raw>}}.

{{<raw>}}<h4 class="display-8">Simulation Results</h4> {{</raw>}}
In order to observe probabilities using simulations, it is necessary to repeat your simulation a significant number of times and aggregate the results. For a certain state, you can then simply use all observed transitions to infere the underlying probabilities.

Since we are interesting in whether or not the system manages to self-stabilizes or whether we should take action, we are interested in figuring out the number of iterations or even the time it might take untill this system stabilizes. In order to do so, I have run simulation several 1000s times allowing for 100 iterations within each simulation. During this iteration, there are 3 steps that can happen:
- Workload eviction, when there are too many workloads
- Node removal, when there are free nodes
- Node addition, when there are unscheduled workloads and less than a specific maximum number of nodes

Once there are no free nodes left and all workloads have been scheduled, the system is marked as stable and I record the number of iterations as well as the time that has passed.

If you graph the number of required iterations over time as a histogram, you get:
{{<raw>}}
<img src="/img/blog/self-stability-simulation_results.png" title="model-state-space"  class="img-fluid" alt="Responsive image" width=950 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

{{<raw>}}<h6 class="display-8">How many iterations does it take for the system to stabilize?</h6> {{</raw>}}

Notice, how the slope decreases over time. This means that the system will be less likely to stabilize over time, if it is unable to find the right path to stability early on. That does not mean that the system is unable to find the target configuration, but merely that it is expected to take much more time once it does not find it immediately. In fact, if the system does not stabilize immediately, it is likely it will continue iterating over several dominant states, e.g. states that have a high transitional probability. Depending on that recurring distribution, this might not necessarily be a bad thing. If, however, this distribution does not offer a likely path to the target state, it might take a long time for the system to end up there. It will eventually end up there as long as we continue iterating. If we can afford to wait long enough, it might thus not be necessary to manually stabilize the system. This is again why you want short iterations. If an iteration would take a couple of seconds, instead of several minutes, we might not care about these sort of instabilities.

There are methods to find this recurring distribution, but since we are more interested in finding out how the system behaves once it has not succeeded in finding the target state right away, it is enough to find its conditional distributions. A conditional distribution in this case describes the probability of the system requiring at least x additional iterations given that it already performed y. If we graph those over time, we get the following:
{{<raw>}}
<img src="/img/blog/self-stability-conditional_distributions_v1.png" title="model-state-space"  class="img-fluid" alt="Responsive image" width=950 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}
If you take in to account the fact that the distribution has been capped, we indeed observe this recurring character. In a way, this is also in line with what we would expect. In fact, we observe that the system has a lack of memory. It does not know which states it already has visited. This memorylessness is what is referred to as the Markov Property and it also means that the future does not depend on the past but only on the present. Maybe there are couple of things us humans could learn from a Markov Chain after all! :)

Anyhow, let's continue. Having a feeling about the number of required iteartions is only one side of the puzzle. Because we are interested in knowing whether we shouldtake action or not, it is interesting to take a look at the time it might take such a system to go though those iterations. Then, if you time the specific operations such that:
- Node Removal: 2 minutes
- Node addition: 10 minutes
- Workload eviction or scheduling: 30 seconds

Notice that these times only represent a raw expectation on our side. In practice, these actions might still differ and depend on several conditions. Also, these might be different for your use case. If you are interestd in playing around with these numbers, take a look at my code: {{<raw>}}<a href="https://github.com/tkennes/self-stability">github</a>{{</raw>}}.

If we then again iteratively condition, we get the following:
{{<raw>}}
<img src="/img/blog/self-stability-conditional_distributions_times_v1.png" title="model-state-space"  class="img-fluid" alt="Responsive image" width=950 style="margin-left: auto; margin-right: auto; display: block;">
{{</raw>}}

In this case, it might thus not be necessary to take action right away. There is a good chance the target state will be found relatively quickly by the system. If the system has no converged before say 100 minutes, it is time to do something about it. But then again, if this is too long for you, this might be a good reason to either:
- Take action right away
- Take appropriate steps to shorten iteration times
- Take appropriate steps to increase the shift the probabilities such that transitions towards the target state are more favourable.

In fact, in this scenario there are no options that guarantee a swift transition to the target state. There always can be complications, even if we scale down our pods such that they do not take up complete nodes. However, there are options that provide more stability during these situations or even help lower the probability of it happening in the first place and in turn mitigate some of the risk.

{{<raw>}}<h4 class="display-8">Possible Solutions/Mitigations</h4> {{</raw>}}
First of all, there is not a clear one-size-fits-all solution. That is, solutions to these kind of problems generally will be depend highly on the situation at hand and might thus be quite specific. Let's look at a couple of criteria in order to score those solutions:

- **Cluster-Autoscaler Effective Scale-Up**: When I scale up in order to schedule a workload, I want to scale in such a way that I am able to schedule the workload afterwards. My scale-up should be accurate and effective.
- **Cluster-Autoscaler Effective Scale-Down**: When I then scale down, I don't want to impact workloads that should not be impacted. E.g. scaling-down should be accurate and effective.
- **Cluster-Autoscaler Inter-AZ Load Balancing**:  When working with more AZs, I want to disperse somewhate equally over those AZs. E.g. I want to avoid having one busy AZ and one that is has a lower level of workloads scheduled.
- **Workload-Node Performance Matching**: Not all workloads have similar requirements in terms of CPU, Memory and Storage. Some might be better off with more IOPS whether others require pure-number-crunching superpowers. Being able to match workloads to nodes effectively could greatly boost the overall performance.
- **Conflict-avoidance**: Since miscommunication between the kubernetes scheduler and the Cluster-Autoscaler being our main problem potentially results in issues, decreasing the probability for these conflicts to happen would be beneficial to the system as a whole

{{<raw>}}<h6 class="display-8">PodDisruptionBudgets (PDB)</h6> {{</raw>}}
The most kubernetes-native way to solve these sort of issues, would be PodDisruptionBudgets (PDBs). Indeed, this solution solves a part of the problem. Using PDBs you can set up criteria that prevent voluntary eviction of a pod. Contrast this to involuntary disruption, where a node suddenly and unexpectedly breaks down. As such, a voluntary disruption is a much more controlled way of figuring out which pod should be evicted. In general, there are 2 types:

**maxUnavailable**: An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".

**minAvailable**: An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod. So for example you can prevent all voluntary evictions by specifying "100%".

Notice thus that a PDB can improve the Multi-AZ complication when there is under-utilization of the nodes, since we have more control with regard to which pods and in result which nodes should be scaled down. PDBs are however not effective with regard to scaling up. This means that the problem, as described above, can still arise since nodes can still be scheduled in the wrong AZ. However, the number of expected required iterations in order to end up in the target state is lowered.

- ✅ Cluster-Autoscaler Effective Scale-Down
- 🚫 Cluster-Autoscaler Effective Scale-Up
- ✅ Cluster-Autoscaler Inter-AZ Load Balancing
- 🚫 Workload-Node Performance Matching
- 🚫 Conflict Avoidance


{{<raw>}}<h6 class="display-8">NodeGroups per AZ</h6> {{</raw>}}
One NodeGroup per AZ, and thus one Cluster-AutoScaler per AZ, would make sure that make sure that nodes are always placed in the appropriate zone. This is also the solution that is put foreward by Weaveworks in their documentation on {{<raw>}}<a href="https://eksctl.io/usage/autoscaling/#zone-aware-auto-scaling">EKSCTL</a>{{</raw>}}. Probably it is also one of the most simplistic solutions.

However, although this solution resolves the issue of inaccurate and ineffective scale-up and scaledown, it does not solve all of our issues. As such, it is no longer possible to balance workloads across multiple nodes throughout our cluster. When we would have a node in zone A, B and C each with a load of 33%, we would not be able to scale down to 2 nodes. As such, we have lost the possibility of Inter-AZ Load Balancing via the Cluster-Autoscaler.

Next to that, notice that this solution narrows the overlap between the kubernetes Scheduler and the Node scheduler. In fact, the conflicts that we have seen will no longer return at all.

Finally, it is important to note that this also seems to be what AWS advises, as it has introduced the possibility of scaling similar NodeGroups together even when they are dispersed over multiple AZs. Similar NodeGroups in this case consist of the same type and have the same labels (except for automatically added zonal labels). That means that the AutoScaler will make sure that the number of nodes per NodeGroup and, when those NodeGroups are dispersed over multiple AZ, hitherto per AZ. There are however no guarantees. When we have a limit of 16 nodes and we are working in 3 AZ, then one AZ will still have an additional node. You might thus still experience issues if you choose to opt for a different distribution, like we did ({A: 5, B: 5, C: 3}). Next to that, only NodeGroups that support the same set of pending pods can be balanced by this option. When you thus hard-couple pods to zones for whatever reason, you will not be able to make use of this option.

- ✅ Cluster-Autoscaler Effective Scale-Down
- ✅ Cluster-Autoscaler Effective Scale-Up
- 🚫 Cluster-Autoscaler Inter-AZ Load Balancing
- 🚫 Workload-Node Performance Matching
- ✅ Conflict Avoidance


{{<raw>}}<h6 class="display-8">NodeGroups per Workload Type</h6> {{</raw>}}

In order to hang onto the Inter-AZ Load Balancing you could define NodeGroups per type of workload instead per AZ. You could then match Type A to memory intensive and type B to IO intensive nodes, or whatever is necessary for your use case. However, you would obviously not be able to prevent the issue above since you still have NodeGroups dispersed over multiple AZs. Scaling up and scaling down still is not effective.

- 🚫 Cluster-Autoscaler Effective Scale-Down
- 🚫 Cluster-Autoscaler Effective Scale-Up
- ✅ Cluster-Autoscaler Inter-AZ Load Balancing
- ✅ Workload-Node Performance Matching
- 🚫 Conflict Avoidance



{{<raw>}}<h6 class="display-8">NodeSizing</h6> {{</raw>}}
Yes, indeed, you should not set the size of your pods equal to your nodes. If your pods tend to be large, make your nodes larger. That would be the common mantra of seasoned kubernetes engineers. This was also a common answer I received. The answer is not wrong, but is not exactly right. If you make the size of your nodes larger, you would avoid some of the conflicts between the Kubernetes scheduler and the Cluster Autoscaler, but you still might encounter some now and then. As long as you do not need to scale up or scale down your nodes, you are safe. But as soon as you need to do so, you might again end up in the same scenario as above. It might work, but if your workloads are too flexible you better start praying for a swift path to the target state. As such, only tinkering with the size of your nodes is not a proper solution, and it would certainly not aid in the flexibility of the system as a whole.

- 🚫 Cluster-Autoscaler Effective Scale-Down
- 🚫 Cluster-Autoscaler Effective Scale-Up
- 🚫 Cluster-Autoscaler Inter-AZ Load Balancing
- 🚫 Workload-Node Performance Matching
- ⚠️  Conflict Avoidance (better but not avoided!)

{{<raw>}}<h4 class="display-8">Conclusion</h4> {{</raw>}}
Looking at the solutions above, it might be tempting to simple combine them and get 5 ✅. That might work, but in general you should opt for a balanced solution. Make use of multiple Cluster-AutoScalers, use a bit larger nodes, implement PDBs and make use or build tools that allow for easy maintenance and re-direction later on. Try to keep deployments and changes to your cluster small, so you can quickly revert back and easily pinpoint the problem. Next to that, keep an eye on what they are doing at AWS and read a blog (like this one!) now and then in order to stay on top of new potential solutions. Personally, I am waiting for the day when Kubernetes is able to scale up itself natively without help from the AWS Cluster AutoScaler!

Finally, prepare for these scenarios as well. In the end, we have also enlarged the size of our NodeGroups in terms of maximum number of nodes and put alerting in place to let us know when this issue occurs. Because scaling down is easier to manage using PDBs, one of the easiest quick-fixes would be rolling out a new node in every zone. That would at least ensure that every workload can be scheduled.

If you have made it all the way to the end, congrats! I would love to hear your thoughts. Perhaps you have experienced these sort of issues and found different solutions. Hit me up and let me know!

{{<raw>}}
<br>
<br>
{{</raw>}}
