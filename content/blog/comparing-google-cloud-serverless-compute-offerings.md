---
title: "Comparing Google Cloud Serverless Compute platforms"
description: "How does Cloud Run compare to App Engine Flex for example? And what is the difference between Cloud Run for Anthos and Cloud Run? To answer these questions I created a quick overview of these platforms that will outline the use cases, benefits and limitations of Google's Serverless Compute offerings." 
id: "blog"
date: "2020-05-06"
author: "Bas Tichelaar"
audio: []
images: ["https://skyworkz.nl/img/blog/gcp-serverless-decision-tree.png"]
series: []
tags: ["google cloud", "gcp", "serverless", "google cloud run", "google app engine", "anthos", "google cloud functions"]
videos: []
---
Cloud providers are abstracting away the concept of a server: meet serverless. Instead of spinning up a bunch of servers, you just deploy your code or container image and the platform will spin up the required resources. But there are quite a few options when using Google Cloud.

Wietse Venema, writer of the book [Mastering Serverless Applications with Google Cloud Run](https://www.oreilly.com/library/view/mastering-serverless-applications/9781492057086/), created a nice architectural overview of all the serverless compute options.
<div class="w-25 float-right mx-2">
<a href="#" class="thumbnail" id="overview">
<img class="img-fluid img-thumbnail" src="/img/blog/gcp-serverless-compute-overview.jpg" data-toggle="modal" data-target="#modal1" />
</a>
</div>

<div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body mb-0 p-0">
                <img class="img-fluid" src="/img/blog/gcp-serverless-compute-overview.jpg" />
            </div>
        </div>
    </div>
</div>

It explains the layers of Googles Compute offerings from the infrastructure up to the running code. But if you have no idea what these services are, this overview might confuse you even more. How does Cloud Run compare to App Engine Flex for example? And what is the difference between Cloud Run for Anthos and Cloud Run? To answer these questions I created a quick overview of these platforms that will outline the use cases, benefits and limitations of these serverless compute offerings. Hope this helps when deciding between the various solutions. 

## <a class="anchor" name="decisiontree"></a>TL;DR: Decision tree to choose a Serverless Compute platform

Google provides an [overview](https://cloud.google.com/serverless-options) on when to choose which serverless platform. But unfortunately the overview is not complete. I’ve extended it with some extra requirements like HTTP streaming support and support for scale to zero. This image should provide enough information to help you choosing a solution.

<div class="text-center mt-3 mb-3">
<svg class="img-fluid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="851px" height="1055px" viewBox="-0.5 -0.5 851 1055" content="<mxfile host=&quot;app.diagrams.net&quot; modified=&quot;2020-05-01T11:35:04.407Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 Edg/81.0.416.64&quot; etag=&quot;7w810tW92cWDKJDRwdGy&quot; version=&quot;13.0.3&quot; type=&quot;google&quot;><diagram id=&quot;ZTymIbaLBzdVOghsk7CT&quot; name=&quot;Page-1&quot;>7Vxrj9o4FP01SLsrgZI4z4/zot1utx3ttOr208gEE9wJcdZxZqC/fu3EhjwGCIVAGMFIDHFsY/ucc3197dADN7P5Owrj6d9kjMKeoY3nPXDbMwzdtBz+T6Qs8hTX8vKEgOKxzLRKeMA/kUzUZGqKxygpZWSEhAzH5USfRBHyWSkNUkpeytkmJCx/awwDVEt48GFYT/2Gx2wqe2E4q/T3CAdT9c26Lfs3gyqz7EkyhWPyUkgCdz1wQwlh+afZ/AaFYvDUuOTlhmvuLhtGUcSaFNDsDxN083PYv2YJ7r+MbePuQ9+WbWML1WE05v2Xl4SyKQlIBMO7Veo1JWk0RqJWjV+t8nwkJOaJOk/8gRhbSDBhyghPmrJZKO+iOWb/iuIDS159L9y5ncuas4uFuogYXRQKicvvxXurYtmVKuen9Dlrq6g+YZQ8oRsSEpp1Fria+ON36oMpxzchKfXRhhFUpIQ0QGxDPiPPJ4a38AUSqneIzBBvNs9AUQgZfi7TD0oWB8t8K6D5B4n1Drg754J7Z/ADncJP1vsMw1R+07cpZDzlCUdj/o9MxLfGcWYFEX9fkJS/j1IcjnEU9MCwRoAVvGKoX6aYoYcYZmP3wm17GcoaEl722oTEM6IMzTeOnbxrmnKw5ZwBpAV9WRlgXVnVacH42lpLo216vyCXEnPPyma2ITOjocysTsnMqMnsgUGGQpQkPPn9ly/3HZaRoVwRKSP95DoCv+JudEpHrlFW0kpYa7SUXd0jivkIItqiwEBDgenuoRWWFb2iFC4KGWKCI5YUar4XCStyOlaZnJ5jV+iV17gi27Jpe/CvJudbynsYiZlRNP4mJGk2e1L+NsQUjWAiJk/E8+Sd6ajUba9rUjeMc5d6Rei63RWlWw2VrirsyFxqmm+LESdwopoi346Jr9lwveJgAKdiTfKGylIV+hzAnFs1c/4JIWG//0pHiEZchtxm3+TBoQkOUgpHoTDnU0jHL/myKLP0uR83zCBI45gTq9vrI6Mydy5DTEVrbx7V2ltnqe02NOo21Kh3Go2aoMKBvEOtadQ8e5f/5Fa/KaPMg6+dD0upekWWXarI1o47f7jr5g8/TRiZ8Q8hjIIUBmIe0WAWWEsWCUPZLTyikGKxN9HluUKvzBWckKdeGXTHIugFe7CyDtsswm4BgDYsgtfQIqhNtNZXAF8TRD+PfogNOCGaEQrzog+5O5WJaqmlP/LqQxw95bmmjIndvCtRuzH0xSJ8EBAShGjgCxkOYRyjKMAR99iGY+JzNQ7ZFPWXyX0UPWNKotlqmb6Rgl5hFCRlOylewyyL1zJfES/QDyJefllAcRc9/8pe0mWGf02n2wVtHEnQDaF3L9AfDfpuRXNUuwvO09cIC/OfbT2OURyShbDHHfaNTKeBeT2ub/TGNho7FDVV+jnBBsl+Qqtv9Q/TyGeYRB2WlmWXt/AdzTqxtJSb9FakdYq5ymgqoW7t4qt2FyR0Fcch9mHHVQTczqkIvC0VdWmCarq7Yx98Vf96eM4A1sAq8c8z3YHuuo6nXuUqWw7XgfPcZHhT3FPHudvmnqnZA12rsM/SB5are4dm37rglQwGT2Aibggy9BMfhuL4pNw4TLJz4uJEOn/7iShZxoLbC24BXopDzFvxOOUGvx+iZxQ+ThBkKUVNgl851ucQ/arsM7gtzn6vRL/W0UIeErJ5b3WhOuWNJzsjP1mVlMhvB8/dCF4BmgkOwwIwlu6aQ1CDLCKRsJICFO4OhVchDiKezIQ9vM46fU8SnLlJ4NbnWAoztMz+sZJhRJjYNwHXUNazLJFwCnHKfsnsbF/YvQmJmLSzuq6uZU/U9WvESqYwFnlm80A8cTII/NgYTNH8T1804Tqm+YfbbLwfJ2Vw9lvTOHZ1PgR1RnqgTkjXGKgjza1yUvsnFWfZJplxuor49LY7KaEsNqRp1ICQpTG7EHIrIZejuufCQCsREdjWQAWzjsXFhmd01NNPF6ft0E6b2dRp0w/utO21hrTeWCTmHClxrDWk7jkDw9M19VJUVCc+HDCwPG9Hl37Xs+a6YZa/FVSelKwufHWwKX87Z9PNtacZcTQSfO+pg4raA6MIzvJ1yG8vaJQQ/wmx33tncnyxyaa2dcygljqGVBh67t+HTE76PXGAVI2E/V8qHtjl4wAm2auYZAfi//e7B1VcOPlZDfmdut0LQxwnaDsgMInzp5sneC5ArHpTmuZ55u06b+oQHodVVi7QQA21146cmruDts7JvcoeZ7yTa+W9V9lbXdu8xxfXdrtrywf3ERVw2dO3LZ8K7OYia0f6ZW5/40X+hXg7r6mEU8igbOJGJ6o5E8vzlG3rA+PIa6xmpjCfa0ZUTTPDkDuu2aMO+4ciJ6W6Nv+WhHah7QnspW6f2F42/KWR+jmGfZysT5+P7mMNh4C/WvSxDLu64dail9UQtfqq5IJa9ZCuW8LMtJ0TY3ZZzmw3mpbZMdCcC2hbQatEDmx1Nu5koHkX67jtlwmcKmSvOdFHRc25eCLbnzAu7y+5Tt2nPC5mxsU8bg2c2FrFfWwRNhHTWP50YR4DX/0AJLj7Hw==</diagram></mxfile>" style="background-color: rgb(255, 255, 255);"><defs></defs><g><path d="M 514 80 Q 514 100 427 100 Q 340 100 340 113.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 340 118.88 L 336.5 111.88 L 340 113.63 L 343.5 111.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><path d="M 514 80 Q 514 100 642 100 Q 770 100 770 113.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 770 118.88 L 766.5 111.88 L 770 113.63 L 773.5 111.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="454" y="20" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 50px; margin-left: 455px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">What kind of app are you building?</div></div></div></foreignObject><text x="514" y="54" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">What kind of app are...</text></switch></g><path d="M 340 180 Q 340 180 340 203.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 340 208.88 L 336.5 201.88 L 340 203.63 L 343.5 201.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="280" y="120" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 150px; margin-left: 281px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Stateless HTTP</div></div></div></foreignObject><text x="340" y="154" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Stateless HTTP</text></switch></g><path d="M 770 180 Q 770 966.2 670.59 966.21" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 665.34 966.21 L 672.34 962.71 L 670.59 966.21 L 672.34 969.71 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="710" y="120" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 150px; margin-left: 711px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Driven by Cloud or Firebase events</div></div></div></foreignObject><text x="770" y="154" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Driven by Cloud or F...</text></switch></g><path d="M 340 270 Q 340 312.9 388.75 312.9 Q 437.5 312.9 437.5 362.61" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 437.5 367.86 L 434 360.86 L 437.5 362.61 L 441 360.86 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><path d="M 340 270 Q 340 320 285 320 Q 230 320 230 363.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 230 368.88 L 226.5 361.88 L 230 363.63 L 233.5 361.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="270" y="210" width="140" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 138px; height: 1px; padding-top: 240px; margin-left: 271px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need Kubernetes, configurable hardware or HTTP/2 support?</div></div></div></foreignObject><text x="340" y="244" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need Kubernetes, config...</text></switch></g><path d="M 230 430 Q 230 480 277.75 480 Q 325.5 480 325.5 523.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 325.5 528.88 L 322 521.88 L 325.5 523.63 L 329 521.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><path d="M 230 430 Q 230 480 182.5 480 Q 135 480 135 523.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 135 528.88 L 131.5 521.88 L 135 523.63 L 138.5 521.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="170" y="370" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 400px; margin-left: 171px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need custom languages and system libraries?</div></div></div></foreignObject><text x="230" y="404" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need custom language...</text></switch></g><path d="M 391 560 Q 391 560 483.63 560" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 488.88 560 L 481.88 563.5 L 483.63 560 L 481.88 556.5 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><a xlink:href="https://cloud.google.com/appengine/docs/the-appengine-environments" target="_blank"><rect x="260" y="530" width="131" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 129px; height: 1px; padding-top: 560px; margin-left: 261px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Supported languages*</div></div></div></foreignObject><text x="326" y="564" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Supported languages*</text></switch></g></a><path d="M 550 590 Q 550 642.5 502 642.5 Q 454 642.5 454 688.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 454 693.88 L 450.5 686.88 L 454 688.63 L 457.5 686.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><path d="M 550 590 Q 550 642.5 592 642.5 Q 634 642.5 634 688.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 634 693.88 L 630.5 686.88 L 634 688.63 L 637.5 686.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="490" y="530" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 560px; margin-left: 491px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Unit of deployment</div></div></div></foreignObject><text x="550" y="564" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Unit of deployment</text></switch></g><path d="M 634 755 Q 634 755 634 931.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 634 937.07 L 630.5 930.07 L 634 931.82 L 637.5 930.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="574" y="695" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 725px; margin-left: 575px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Function</div></div></div></foreignObject><text x="634" y="729" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Function</text></switch></g><path d="M 454 755 Q 454 775 397 775 Q 340 775 340 788.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 340 793.88 L 336.5 786.88 L 340 788.63 L 343.5 786.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="394" y="695" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 725px; margin-left: 395px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Application</div></div></div></foreignObject><text x="454" y="729" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Application</text></switch></g><path d="M 340 855 Q 340 890 281.75 890 Q 223.5 890 223.5 931.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 223.5 937.07 L 220 930.07 L 223.5 931.82 L 227 930.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><path d="M 340 855 Q 340 890 391.75 890 Q 443.5 890 443.5 931.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 443.5 937.07 L 440 930.07 L 443.5 931.82 L 447 930.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><a xlink:href="https://cloud.google.com/appengine/docs/the-appengine-environments#comparing_high-level_features" target="_blank"><rect x="280" y="795" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 825px; margin-left: 281px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need fast auto-scaling or scale to zero?</div></div></div></foreignObject><text x="340" y="829" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need fast auto-scali...</text></switch></g></a><a xlink:href="https://cloud.google.com/functions/docs" target="_blank"><path d="M 621.71 994.24 C 619.63 994.24 617.65 993.09 616.61 990.94 L 604.41 968.96 C 603.31 967.04 603.48 964.81 604.41 963.21 L 616.71 941.22 C 617.76 939.22 619.62 938.19 621.51 938.19 L 646.21 938.19 C 648.05 938.19 649.86 939.12 650.95 941 L 663.21 962.97 C 664.69 965.29 664.18 967.75 663.34 969.13 L 651.16 990.98 C 650.34 992.75 648.5 994.24 646.13 994.24 Z" fill="#5184f3" stroke="none" pointer-events="all"></path><path d="M 639.59 994.24 L 624.66 978.97 L 620.44 959.31 L 627.33 956.3 L 637.76 967.2 L 640.5 964.7 L 644.55 969.35 L 648.18 958.75 L 661.43 972.56 L 651.16 990.98 C 650.35 992.75 648.5 994.24 646.13 994.24 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"></path><rect x="603.31" y="938.19" width="0" height="0" fill="none" stroke="none" pointer-events="all"></rect><path d="M 643.14 978.92 L 640.39 976.14 L 644.26 972.13 L 644.26 960.27 L 640.41 956.33 L 643.16 953.53 L 648.21 958.75 L 648.21 973.69 Z M 639.22 968.23 C 638.11 968.23 637.35 967.29 637.35 966.22 C 637.35 965.13 638.08 964.23 639.25 964.23 C 640.35 964.23 641.07 964.98 641.07 966.22 C 641.07 967.48 640.22 968.23 639.22 968.23 Z M 634.04 968.2 C 632.78 968.2 631.94 967.38 631.94 966.21 C 631.94 965.09 632.77 964.32 633.96 964.32 C 635.27 964.32 635.84 965.14 635.84 966.3 C 635.84 967.14 634.98 968.2 634.04 968.2 Z M 628.56 968.2 C 627.61 968.2 626.68 967.36 626.68 966.2 C 626.68 965.17 627.48 964.25 628.68 964.25 C 629.8 964.25 630.44 965.19 630.44 966.25 C 630.44 967.3 629.68 968.2 628.56 968.2 Z M 624.66 978.97 L 619.62 973.67 L 619.62 958.75 L 624.7 953.49 L 627.33 956.3 L 623.5 960.26 L 623.5 972.16 L 627.39 976.14 Z" fill="#ffffff" stroke="none" pointer-events="all"></path><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 1008px; margin-left: 634px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">Cloud<br>Functions</div></div></div></foreignObject><text x="634" y="1019" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">Cloud...</text></switch></g></a><a xlink:href="https://cloud.google.com/anthos/run" target="_blank"><path d="M 425.21 425.03 C 423.13 425.03 421.15 423.88 420.11 421.73 L 407.91 399.75 C 406.81 397.83 406.98 395.6 407.91 394 L 420.21 372.01 C 421.26 370.01 423.12 368.98 425.01 368.98 L 449.71 368.98 C 451.55 368.98 453.36 369.91 454.45 371.79 L 466.71 393.76 C 468.19 396.08 467.68 398.54 466.84 399.92 L 454.66 421.77 C 453.84 423.54 452 425.03 449.63 425.03 Z" fill="#5184f3" stroke="none" pointer-events="all"></path><path d="M 441.32 425.03 L 426.37 410.71 L 431.67 397 L 430.76 386.35 L 437.27 393.18 L 435.98 386.58 L 453.38 397 L 463.03 406.75 L 454.66 421.77 C 453.85 423.54 452 425.03 449.63 425.03 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"></path><rect x="406.81" y="368.98" width="0" height="0" fill="none" stroke="none" pointer-events="all"></rect><path d="M 439.19 395.06 L 446.89 395.01 L 437.1 388.13 Z M 433.54 410.76 L 437.71 397.05 L 433.57 383.23 L 453.38 397 Z M 426.37 410.71 L 430.45 396.93 L 426.35 383.25 L 430.76 386.35 L 434 396.86 L 430.79 407.66 Z" fill="#ffffff" stroke="none" pointer-events="all"></path><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 439px; margin-left: 438px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">Cloud Run for Anthos</div></div></div></foreignObject><text x="438" y="450" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">Cloud Run for Ant...</text></switch></g></a><path d="M 135 590 Q 135 620.7 100.75 620.7 Q 66.5 620.7 66.5 658.11" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 66.5 663.36 L 63 656.36 L 66.5 658.11 L 70 656.36 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><path d="M 135 590 Q 135 620 179.25 620 Q 223.5 620 223.5 931.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"></path><path d="M 223.5 937.07 L 220 930.07 L 223.5 931.82 L 227 930.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"></path><rect x="60" y="530" width="150" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"></rect><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 148px; height: 1px; padding-top: 560px; margin-left: 61px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need inbound HTTP Streaming (websocket) support?</div></div></div></foreignObject><text x="135" y="564" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need inbound HTTP Streami...</text></switch></g><ellipse cx="388" cy="313" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 313px; margin-left: 369px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="388" y="317" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g><a xlink:href="https://cloud.google.com/appengine/docs" target="_blank"><path d="M 431.21 994.24 C 429.13 994.24 427.15 993.09 426.11 990.94 L 413.91 968.96 C 412.81 967.04 412.98 964.81 413.91 963.21 L 426.21 941.22 C 427.26 939.22 429.12 938.19 431.01 938.19 L 455.71 938.19 C 457.55 938.19 459.36 939.12 460.45 941 L 472.71 962.97 C 474.19 965.29 473.68 967.75 472.84 969.13 L 460.66 990.98 C 459.84 992.75 458 994.24 455.63 994.24 Z" fill="#5184f3" stroke="none" pointer-events="all"></path><path d="M 451.3 994.24 L 425.71 968.02 L 430.86 963.27 L 432.53 965.26 L 442.45 954.94 L 440.73 953.25 L 444.19 947.93 L 460.94 965.16 L 461.15 965.14 L 469.92 974.38 L 460.66 990.98 C 459.85 992.75 458 994.24 455.63 994.24 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"></path><rect x="412.81" y="938.19" width="0" height="0" fill="none" stroke="none" pointer-events="all"></rect><path d="M 455.9 963.2 L 460.78 964.91 C 461.21 965.1 461.26 965.21 461.26 965.6 L 461.26 967.41 C 461.26 967.99 460.9 968.27 460.39 968.27 L 455.97 968.21 C 456.3 967.07 456.21 964.91 455.9 963.2 Z M 440.73 953.25 L 442.27 948.24 C 442.34 948.02 442.47 947.79 442.74 947.79 L 443.85 947.78 C 444.1 947.78 444.27 947.96 444.36 948.2 L 446.23 953.33 C 444.96 952.88 442.59 952.86 440.73 953.25 Z M 430.81 968.32 L 426.5 968.27 C 425.78 968.27 425.54 967.99 425.54 967.53 L 425.54 965.93 C 425.54 965.19 425.81 964.87 426.34 964.69 L 430.86 963.27 C 430.68 964.68 430.46 966.43 430.81 968.32 Z M 443.5 968.69 C 444.64 968.69 445.81 967.55 445.81 966.34 C 445.81 964.88 444.79 963.69 443.4 963.69 C 442.14 963.69 440.98 964.82 440.98 966.37 C 440.98 967.48 442.05 968.69 443.5 968.69 Z M 443.51 972.13 C 441.6 972.13 440.13 971.4 439.49 970.32 L 440.56 969.34 C 439.89 968.53 439.47 967.82 439.47 966.43 C 439.47 963.58 441.9 962.27 443.33 962.27 C 444.42 962.27 445.52 962.66 446.24 963.54 L 447.27 962.39 C 448.45 963.51 448.9 964.72 448.9 966.61 C 448.9 969.57 446.85 972.13 443.51 972.13 Z M 443.47 974.73 C 447.87 974.73 451.59 970.77 451.59 966.33 C 451.59 961.22 447.53 957.73 443.36 957.73 C 439.18 957.73 435.1 961.57 435.1 966.12 C 435.1 971.53 439.86 974.73 443.47 974.73 Z M 443.4 977.57 C 436.82 977.57 432.28 971.76 432.28 966.33 C 432.28 960.85 436.42 954.86 443.5 954.86 C 449.72 954.86 454.43 960.22 454.43 966.15 C 454.43 972.96 449.23 977.57 443.4 977.57 Z" fill="#ffffff" stroke="none" pointer-events="all"></path><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 1008px; margin-left: 444px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">App Engine</div></div></div></foreignObject><text x="444" y="1019" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">App Engine</text></switch></g></a><a xlink:href="https://cloud.google.com/run/docs" target="_blank"><path d="M 54.21 720.53 C 52.13 720.53 50.15 719.38 49.11 717.23 L 36.91 695.25 C 35.81 693.33 35.98 691.1 36.91 689.5 L 49.21 667.51 C 50.26 665.51 52.12 664.48 54.01 664.48 L 78.71 664.48 C 80.55 664.48 82.36 665.41 83.45 667.29 L 95.71 689.26 C 97.19 691.58 96.68 694.04 95.84 695.42 L 83.66 717.27 C 82.84 719.04 81 720.53 78.63 720.53 Z" fill="#5184f3" stroke="none" pointer-events="all"></path><path d="M 70.32 720.53 L 55.37 706.21 L 60.67 692.5 L 59.76 681.85 L 66.27 688.68 L 64.98 682.08 L 82.38 692.5 L 92.03 702.25 L 83.66 717.27 C 82.85 719.04 81 720.53 78.63 720.53 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"></path><rect x="35.81" y="664.48" width="0" height="0" fill="none" stroke="none" pointer-events="all"></rect><path d="M 68.19 690.56 L 75.89 690.51 L 66.1 683.63 Z M 62.54 706.26 L 66.71 692.55 L 62.57 678.73 L 82.38 692.5 Z M 55.37 706.21 L 59.45 692.43 L 55.35 678.75 L 59.76 681.85 L 63 692.36 L 59.79 703.16 Z" fill="#ffffff" stroke="none" pointer-events="all"></path><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 735px; margin-left: 67px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">Cloud Run</div></div></div></foreignObject><text x="67" y="746" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">Cloud Run</text></switch></g></a><a xlink:href="https://cloud.google.com/appengine/docs/flexible" target="_blank"><path d="M 211.21 994.24 C 209.13 994.24 207.15 993.09 206.11 990.94 L 193.91 968.96 C 192.81 967.04 192.98 964.81 193.91 963.21 L 206.21 941.22 C 207.26 939.22 209.12 938.19 211.01 938.19 L 235.71 938.19 C 237.55 938.19 239.36 939.12 240.45 941 L 252.71 962.97 C 254.19 965.29 253.68 967.75 252.84 969.13 L 240.66 990.98 C 239.84 992.75 238 994.24 235.63 994.24 Z" fill="#5184f3" stroke="none" pointer-events="all"></path><path d="M 231.3 994.24 L 205.71 968.02 L 210.86 963.27 L 212.53 965.26 L 222.45 954.94 L 220.73 953.25 L 224.19 947.93 L 240.94 965.16 L 241.15 965.14 L 249.92 974.38 L 240.66 990.98 C 239.85 992.75 238 994.24 235.63 994.24 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"></path><rect x="192.81" y="938.19" width="0" height="0" fill="none" stroke="none" pointer-events="all"></rect><path d="M 235.9 963.2 L 240.78 964.91 C 241.21 965.1 241.26 965.21 241.26 965.6 L 241.26 967.41 C 241.26 967.99 240.9 968.27 240.39 968.27 L 235.97 968.21 C 236.3 967.07 236.21 964.91 235.9 963.2 Z M 220.73 953.25 L 222.27 948.24 C 222.34 948.02 222.47 947.79 222.74 947.79 L 223.85 947.78 C 224.1 947.78 224.27 947.96 224.36 948.2 L 226.23 953.33 C 224.96 952.88 222.59 952.86 220.73 953.25 Z M 210.81 968.32 L 206.5 968.27 C 205.78 968.27 205.54 967.99 205.54 967.53 L 205.54 965.93 C 205.54 965.19 205.81 964.87 206.34 964.69 L 210.86 963.27 C 210.68 964.68 210.46 966.43 210.81 968.32 Z M 223.5 968.69 C 224.64 968.69 225.81 967.55 225.81 966.34 C 225.81 964.88 224.79 963.69 223.4 963.69 C 222.14 963.69 220.98 964.82 220.98 966.37 C 220.98 967.48 222.05 968.69 223.5 968.69 Z M 223.51 972.13 C 221.6 972.13 220.13 971.4 219.49 970.32 L 220.56 969.34 C 219.89 968.53 219.47 967.82 219.47 966.43 C 219.47 963.58 221.9 962.27 223.33 962.27 C 224.42 962.27 225.52 962.66 226.24 963.54 L 227.27 962.39 C 228.45 963.51 228.9 964.72 228.9 966.61 C 228.9 969.57 226.85 972.13 223.51 972.13 Z M 223.47 974.73 C 227.87 974.73 231.59 970.77 231.59 966.33 C 231.59 961.22 227.53 957.73 223.36 957.73 C 219.18 957.73 215.1 961.57 215.1 966.12 C 215.1 971.53 219.86 974.73 223.47 974.73 Z M 223.4 977.57 C 216.82 977.57 212.28 971.76 212.28 966.33 C 212.28 960.85 216.42 954.86 223.5 954.86 C 229.72 954.86 234.43 960.22 234.43 966.15 C 234.43 972.96 229.23 977.57 223.4 977.57 Z" fill="#ffffff" stroke="none" pointer-events="all"></path><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 1008px; margin-left: 224px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">App Engine<br>Flexible</div></div></div></foreignObject><text x="224" y="1019" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">App Engine...</text></switch></g></a><ellipse cx="296.5" cy="313" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 313px; margin-left: 278px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="297" y="317" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="279" cy="477" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 477px; margin-left: 260px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="279" y="481" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="185" cy="477" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 477px; margin-left: 166px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="185" y="481" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g><ellipse cx="180" cy="621" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 621px; margin-left: 161px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="180" y="625" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g><ellipse cx="98" cy="621.29" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 621px; margin-left: 79px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="98" y="625" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="281" cy="885" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 885px; margin-left: 262px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="281" y="889" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="391.5" cy="885" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"></ellipse><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 885px; margin-left: 373px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="392" y="889" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></g><a transform="translate(0,-5)" xlink:href="https://desk.draw.io/support/solutions/articles/16000042487" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>
</a>
</div>

Below I will go more in depth into the various serverless compute offerings of GCP. I will explain the benefits and drawbacks of each solution, what the solution actually provides and what the ideal use cases are.

## <a class="anchor" name="cloudrun"></a>Cloud Run: serverless containers

If you just want to run a container that listens on an HTTP endpoint and serves requests, [Google Cloud Run](https://cloud.google.com/run/docs) does just that. Cloud Run does not build the container for you, that’s something you have to do yourself. Cloud Run only takes care of scaling your container when requests come in, and scales it down again when there is no traffic. Cloud Run is based on [Knative](https://knative.dev/), which leverages Kubernetes for you. 

Cloud Run is ideal when you just want to a container that listens on an HTTP endpoint or a [Pub/Sub](https://cloud.google.com/pubsub/docs/overview) topic, and you want to keep control over the underlying runtime. You don’t have to manage the server, configure a Kubernetes cluster or create auto scalers. Cloud Run takes care of that.

#### Overview

<table class="table table-striped table-responsive">
    <tbody>
        <tr>
            <td class="w-25">Typical use cases</td>
            <td class="w-75">Simple web applications, batch jobs (> 15 minutes), machine learning jobs</td>
        </tr>
        <tr>
            <td>Input
            </td>
            <td>
                Container image
            </td>
        </tr>
        <tr>
            <td>
                Trigger
            </td>
            <td>
                HTTP endpoint or Cloud Pub/Sub topic
            </td>
        </tr>
        <tr>
            <td>
                Warm up time
            </td>
            <td>
                ~ 2 seconds
            </td>
        </tr>
        <tr>
            <td>
                Benefits
            </td>
            <td>
                <ul>
                    <li>Usage based pricing (scale to zero)</li>
                    <li>Easy auto-scaling</li>
                    <li>Portability: runs any container</li>
                    <li>No infrastructure management (GKE still requires some maintenance)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                Drawbacks
            </td>
            <td>
                <ul>
                    <li>You still need a pipeline to go from code to container image (you could leverage <a href="https://cloud.google.com/cloud-build/docs">Google Cloud Build</a> and <a href="https://cloud.google.com/container-registry/docs">Google Container Registry (GCR)</a></li>
                    <li>Does not support HTTP streaming (websockets)</li>
                    <li>Does not support HTTP/2</li>
                    <li>Supports unary gRPC API's via the <a href="https://cloud.google.com/endpoints/docs/grpc/get-started-cloud-run">Extensible Service Proxy V2 Beta</a></li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>


Cloud Run still has some compatibility issues with other Google Cloud services. Please check [this page](https://cloud.google.com/run/docs/issues) for more details.

## <a class="anchor" name="cloudrunforanthos"></a>Cloud Run for Anthos: serverless containers (sort of…)
If you already have a Kubernetes cluster ([GKE](https://cloud.google.com/kubernetes-engine/docs)) or if you need to use custom hardware, then it’s possible to install [Cloud Run for Anthos](https://cloud.google.com/run/docs/quickstarts/prebuilt-deploy-gke) on your Kubernetes cluster. This will add the serverless functionality of Knative to your cluster: scale to zero and auto-scaling. You will get the same benefits as with Google Cloud Run, with the additional benefit of support for HTTP/2 and HTTP streaming. If that’s a requirement for your application, then Cloud Run for Anthos is your only option.

#### Overview
<table class="table table-striped table-responsive w-100 d-block d-md-table">
    <tbody>
        <tr>
            <td class="w-25">
                Typical use cases
            </td>
            <td class="w-75">
                Simple web applications, batch jobs (> 15 minutes), machine learning jobs
            </td>
        </tr>
        <tr>
            <td>
                Input
            </td>
            <td>
                Container image
            </td>
        </tr>
        <tr>
            <td>
                Trigger
            </td>
            <td>
                HTTP endpoint or Cloud Pub/Sub topic
            </td>
        </tr>
        <tr>
            <td>
                Warm up time
            </td>
            <td>
                ~ 2 seconds
            </td>
        </tr>
        <tr>
            <td>
                Benefits
            </td>
            <td>
            <ul>
                <li>Scale to zero functionality</li>
                <li>Easy auto-scaling</li>
                <li>Portability: runs any container</li>
                <li>Supports HTTP streaming (websockets)</li>
                <li>Supports HTTP/2 and gRPC</li>
                <li>Runs on top of your Kubernetes platform (on-premise or GKE)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Drawbacks
            </td>
            <td>
            <ul>
                <li>You still need a pipeline to go from code to container image (you could leverage Google Cloud Build and Google Container Registry (GCR))</li>
                <li>You need to manage the underlying Kubernetes cluster yourself (even GKE needs configuration and updates)</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## <a class="anchor" name="cloudfunctions"></a>Cloud Functions: serverless functions

For single purpose workloads, running a complete container might be overkill. Especially if it’s event driven. Deploying a Cloud Function could be a better fit. [Cloud Functions](https://cloud.google.com/functions/docs) are single functions that can be triggered by an HTTP request or a Pub/Sub message. You just provide the function, the platform does the rest: packaging, deploying and running your code. When requests come in, it will automatically scale up and back to zero again. There are some limitations: your function needs to be written in either Python, NodeJS, Golang or Java.

#### Overview


<table class="table table-striped table-responsive w-100 d-block d-md-table">
    <tbody>
        <tr>
            <td class="w-25" >
                Typical use cases
            </td>
            <td class="w-75">
                Micro batch jobs (> 9 minutes), image transformations, streaming processing
            </td>
        </tr>
        <tr>
            <td>
                Input
            </td>
            <td>
                Code (single purpose function)
            </td>
        </tr>
        <tr>
            <td>
                Supported languages
            </td>
            <td>
                Python, Java, Golang or Node.js
            </td>
        </tr>
        <tr>
            <td>
                Trigger
            </td>
            <td>
                HTTP endpoint, Cloud Pub/Sub topic, Cloud Storage bucket or Firebase event
            </td>
        </tr>
        <tr>
            <td>
                Warm up time
            </td>
            <td>
                <p>~ 2 seconds (<a href="https://mikhail.io/serverless/coldstarts/gcp/">more details in this excellent blogpost</a>)</p>
            </td>
        </tr>
        <tr>
            <td>
                Benefits
            </td>
            <td>
            <ul>
                <li>Packaging and deployment is done for you</li>
                <li>Scale to zero functionality</li>
                <li>Easy auto-scaling</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                Drawbacks
            </td>
            <td>
            <ul>
                <li>Only suitable for short running jobs (maximum duration is 9 minutes)</li>
                <li>Does not support HTTP streaming (websockets)</li>
                <li>Does not support HTTP/2 and gRPC</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>


## <a class="anchor" name="appengine"></a>App Engine Standard: serverless applications
If you need a solution to go from code to running application without setting up a deployment pipeline, then App Engine might be the best solution. [Google App Engine](https://cloud.google.com/appengine/docs) just takes your code and deploys it. You pay for what you use: it scales up automatically and back to zero when desired. There are a few limitations: it doesn’t support websockets, HTTP/2 and gRPC, and you need to write your code in one of the supported languages. If you need more flexibility, [App Engine Flex](#appengineflex) might be a better solution.

#### Overview

<table class="table table-striped table-responsive w-100 d-block d-md-table">
    <tbody>
        <tr>
            <td class="w-25">
                Typical use cases
            </td>
            <td class="w-75">
            <ul>
                <li>Simple webapps written in one of the supported languages</li>
                <li>Fast prototyping</li>
                <li>More complex API's with various routes</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                Input
            </td>
            <td>
                Code
            </td>
        </tr>
        <tr>
            <td>
                Supported languages
            </td>
            <td>
                Specific versions of Node.js, Python, PHP, Ruby, Java and Go
            </td>
        </tr>
        <tr>
            <td>
                Triggers
            </td>
            <td>
                HTTP endpoint
            </td>
        </tr>
        <tr>
            <td>
                Warm up time
            </td>
            <td>
                > 500 ms (even faster with a resident instance)
            </td>
        </tr>
        <tr>
            <td>
                Benefits
            </td>
            <td>
            <ul>
                <li>Packaging and deployment is done for you</li>
                <li>Scale to zero functionality</li>
                <li>Easy and rapid auto-scaling</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                Drawbacks
            </td>
            <td>
            <ul>
                <li>Doesn't support websockets</li>
                <li>Doesn't support HTTP/2 and gRPC</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## <a class="anchor" name="appengineflex"></a>App Engine Flexible: serverless applications with custom runtimes
If App Engine is compelling, but too limited in terms of supported runtime, App Engine Flexible might be a better choice. It has a few benefits: support for custom runtime using container images and support for websockets. It also supports background processes, because it doesn’t scale to zero. This could be a benefit or a drawback, depending on your requirements. Other drawbacks are slower deployment and scale up times. App Engine Flexible leverages Cloud Build to build a container using the provided container image and your code. That’s why it scales slower compared to App Engine Standard.

#### Overview

<table class="table table-striped table-responsive w-100 d-block d-md-table">
    <tbody>
        <tr>
            <td class="w-25">
                Typical use cases
            </td>
            <td class="w-75">
            <ul>
                <li>Simple webapps written in any language</li>
                <li>Fast prototyping</li>
                <li>More complex API's with various routes</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                Input
            </td>
            <td>
                Code
            </td>
        </tr>
        <tr>
            <td>
                Supported languages
            </td>
            <td>
                Any language using a custom runtime (container image)
            </td>
        </tr>
        <tr>
            <td>
                Triggers
            </td>
            <td>
                HTTP Endpoint
            </td>
        </tr>
        <tr>
            <td>
                Warm up time
            </td>
            <td>
                Minutes
            </td>
        </tr>
        <tr>
            <td>
                Benefits
            </td>
            <td>
            <ul>
                <li>Packaging and deployment is done for you</li>
                <li>Supports any language using custom container images</li>
                <li>Easy but slower auto-scaling</li>
                <li>Supports websockets</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                Drawbacks
            </td>
            <td>
            <ul>
                <li>Doesn't scale to zero (needs 1 instance minimum)</li>
                <li>Scaling takes more time</li>
                <li>Longer deployment and warm up time compared to App Engine</li>
                <li>Doesn't support HTTP/2 and gRPC</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>


### <a class="anchor" name="conclusion"></a>Conclusion
If you build stateless applications, and you don’t want to manage the underlying infrastructure, the serverless solutions are quite compelling. Whether you want to quickly prototype an application, rapidly autoscale your application or perform taks in response to background events, serverless is your friend.

When making a choice between these offerings, keep these things in mind:

 * If you already have a CI/CD in place and package your code in containers, consider Cloud Run (for Anthos).
 * If you just want to run a simple function, and creating a container would be overkill, Cloud Functions is the best option.
 * If you don’t have a CI/CD in place, and you just want to develop and deploy your entire application, App Engine (Flex) is the go-to solution.
 * If you are building an application that uses HTTP/2 then Cloud Run for Anthos is your only option. But keep in mind that you need to have a Kubernetes cluster up and running. 

 Good luck in choosing the right solution for your situation! If you need any help, you know where to find us :)