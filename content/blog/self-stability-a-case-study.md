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

Self-stabilizing systems are everywhere. The strong nuclear force stabilizes electrostatic forces on an atomic level, supply counteracts demand in economic markets (in the long run) and even though you might feel a bit out of balance now and then, you are literally packed with millions of balancing forces and processes! What can we learn from it within IT? How should we be thinking about self-stabilizing systems within IT and where could it be beneficial?

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">About self-stability</h2> {{</raw>}}
Self-stability comes in a variety of forms, but there are a couple of general elements:
- The system experiences changing dynamics over time
- These dynamics can push the systems into certain unwanted or inferior states
- Depending on the exact or perceived state, a balancing force grows stronger when the state is further from an equilibrium.

A textbook example would be a rocket navigating to the Moon, also see the image below (not at scale). You start off on some initial trajectory, and every time you deviate from it, you quickly use your boosters to get back on track and sort of re-calibrate. Easy enough!
{{<raw>}}
<br>
<br>
{{</raw>}}
If you are controlling that rocket from Earth, you might be dealing with a bit of noise regarding your measurements. For example, your measuring equipment might not give perfect measurements and then there is also of course some lag in the signal because it needs to travel back home. This is not just a problem for rockets finding their way in outer space, but for many positioning systems in general. Luckily, we can solve this issue by continuously estimating our position based on past estimations and their accuracy. E.g. the {{<raw>}}<a href="https://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/">Kalman filter</a>{{</raw>}}.


{{<raw>}}
{{<img src="/img/blog/self-stability-001-kalman-rocket.png" title="kalman-rocket"  width="1000" height="600" class="img-fluid" alt="Responsive image">}}
{{</raw>}}

{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">What can we learn from it within IT?</h2> {{</raw>}}


{{<raw>}}
<br>
<br>
{{</raw>}}
{{<raw>}}<h2 class="display-4">When an Immovable Scaler met an Unstoppable Scheduler</h2> {{</raw>}}

