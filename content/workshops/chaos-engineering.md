---
title: Chaos Engineering
#id: chaos-engineering
type: "workshop"
description: "Increase confidence in your systems"
summary: "Increase confidence in your systems"
image: "img/chaos-engineering.png"
---

{{<section>}}
{{<col-left-2>}}
{{<img class="img-fluid" src="/img/icons/error.svg">}}
{{</col-left-2>}}
{{<col-right-10 title="Accept that every system will fail.">}}

Trying to build the perfect solution is almost impossible,
so accept that things might go wrong and engineer for
them. At times it is easy to foresee what the issue might be, for example an unexpected surge in customer
requests, and what the solution could be, implement autoscaling. But how confident are you that your
solution will work (will autoscaling auto scale fast enough?)?

{{</col-right-10>}}

{{</section>}}


{{<section>}}

{{<col-left-10 title="Gain confidence by introducing controlled chaos">}}
This is where chaos engineering comes in. The goal of chaos
engineering is to understand how your system will
behave under certain conditions in order to improve it. This will increase your confidence in the system.
The
result should either make you feel amazing at the job you’ve done in architecting your system or having to
improve
on what you already have.

{{</col-left-10>}}
{{<col-right-2>}}
{{<img class="img-fluid" src="/img/icons/reputation.svg">}}
{{</col-right-2>}}

{{</section>}}

{{<raw>}}

<section class="mt-lg-5 bg-diagonal">
  <div class="container mt-5">
    <div class="row text-center">
      <div class="col-lg-10 mx-auto">
      <h2 class="display-5">Chaos Engineering Workshop</h2>
            <p class="lead divider-subtitle mt-2 text-muted">We provide you with the expertise to learn the principles
              of chaos engineering. You will learn how to run
              controlled experiments in order to gain more confidence in your system and make it more resilient. You
              will also
              learn the importance of having visibility of the system, and how this can be improved, to be able to debug
              issues
              better.</p>
      </div>
      </div>
      <div class="row text-center">
      <div class="col-lg-8 mx-auto">
        <h2>The program</h2>
        <p class="lead divider-subtitle mt-2 text-muted">This two day workshop consists of theory and practical
          assignments.</p>
      </div>
    </div>
    <div class="row">
      <div class="card-group col-lg-10 mx-auto">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Workshop Day 1</h5>
            <p class="card-text">
              <ul>
                <li>Introduction to Chaos Engineering</li>
                <ul>
                  <li>Principles</li>
                  <li>Tools</li>
                  <li>Patterns</li>
                </ul>
                <li>
                  Deep dive into failures
                </li>
                <ul>
                  <li>What is failure?</li>
                  <li>What are patterns to mitigate failures?</li>
                </ul>
                <li>Game time!</li>
                <ul>
                  <li>Define the experiment </li>
                  <li>Red team: attack the system</li>
                  <li>What are the weak spots of the system?</li>
                  <li>How can we introduce controlled failures?</li>
                </ul>
                <li>Blue team: defend the system</li>
                <ul>
                  <li>Do we have enough visibility?</li>
                  <li>Can we find the root cause ?</li>
                  <li>Can we prevent the failure in the future?</li>
                </ul>
              </ul>
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <p class="card-text">
              <h5 class="card-title">Workshop Day 2</h5>
              <ul>
                <li>Recap of Day 1</li>
                <ul>
                  <li>How difficult was it to cause the issue?</li>
                  <li>How difficult was it to fix the issue?</li>
                  <li>Patterns</li>
                </ul>
                <li>Game time!</li>
                <ul>
                  <li>Swap teams this time</li>
                </ul>
                <li>Continuously verifying the system</li>
                <ul>
                  <li>Can we automate chaos experiments?</li>
                  <li>Can we integrate it with the current way of working?</li>
                </ul>
                <li>Improving the system</li>
                <ul>
                  <li>What areas can be improved?</li>
                  <li>Which tooling can help?</li>
                  <li>What are useful patterns?</li>
                </ul>
                <li>Culture</li>
                <ul>
                  <li>How to avoid blame?</li>
                  <li>How to do proper post-mortems?</li>
                </ul>
              </ul>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-12 text-center">
        <p>So, do you want to become more confident in building and running your systems? Book a workshop today!</p>
      </div>
      <div class="mx-auto text-center">
        <a class="btn btn-warning mt-lg-2" id="book" onclick="showZoomSidebar()">Book now</a>
        </a>
      </div>
    </div>
  </div>
  </div>
</section>

{{</raw>}}