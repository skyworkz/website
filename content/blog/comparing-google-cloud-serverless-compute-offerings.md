---
title: "Comparing Google Cloud Serverless Compute platforms"
description: "How does Cloud Run compare to App Engine Flex for example? And what is the difference between Cloud Run for Anthos and Cloud Run? To answer these questions I created a quick overview of these platforms that will outline the use cases, benefits and limitations of Google's Serverless Compute offerings." 
id: "blog"
date: "2020-04-01"
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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="811px" viewBox="-0.5 -0.5 811 1015" content="&lt;mxfile host=&quot;app.diagrams.net&quot; modified=&quot;2020-05-06T15:38:37.095Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36 Edg/81.0.416.68&quot; etag=&quot;aLsZ0yyBJXT-SkEJfYpU&quot; version=&quot;13.0.8&quot; type=&quot;google&quot;&gt;&lt;diagram id=&quot;ZTymIbaLBzdVOghsk7CT&quot; name=&quot;Page-1&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://app.diagrams.net/?client=1&amp;lightbox=1&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:1015px;"><defs/><g><path d="M 494 60 Q 494 80 407 80 Q 320 80 320 93.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 320 98.88 L 316.5 91.88 L 320 93.63 L 323.5 91.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><path d="M 494 60 Q 494 80 622 80 Q 750 80 750 93.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 750 98.88 L 746.5 91.88 L 750 93.63 L 753.5 91.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="434" y="0" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 30px; margin-left: 435px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">What kind of app are you building?</div></div></div></foreignObject><text x="494" y="34" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">What kind of app are...</text></switch></g><path d="M 320 160 Q 320 160 320 183.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 320 188.88 L 316.5 181.88 L 320 183.63 L 323.5 181.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="260" y="100" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 130px; margin-left: 261px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Stateless HTTP</div></div></div></foreignObject><text x="320" y="134" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Stateless HTTP</text></switch></g><path d="M 750 160 Q 750 946.2 650.59 946.21" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 645.34 946.21 L 652.34 942.71 L 650.59 946.21 L 652.34 949.71 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="690" y="100" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 130px; margin-left: 691px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Driven by Cloud or Firebase events</div></div></div></foreignObject><text x="750" y="134" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Driven by Cloud or F...</text></switch></g><path d="M 320 250 Q 320 292.9 368.75 292.9 Q 417.5 292.9 417.5 342.61" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 417.5 347.86 L 414 340.86 L 417.5 342.61 L 421 340.86 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><path d="M 320 250 Q 320 300 265 300 Q 210 300 210 343.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 210 348.88 L 206.5 341.88 L 210 343.63 L 213.5 341.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="250" y="190" width="140" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 138px; height: 1px; padding-top: 220px; margin-left: 251px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need Kubernetes, configurable hardware or HTTP/2 support?</div></div></div></foreignObject><text x="320" y="224" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need Kubernetes, config...</text></switch></g><path d="M 210 410 Q 210 460 257.75 460 Q 305.5 460 305.5 503.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 305.5 508.88 L 302 501.88 L 305.5 503.63 L 309 501.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><path d="M 210 410 Q 210 460 162.5 460 Q 115 460 115 503.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 115 508.88 L 111.5 501.88 L 115 503.63 L 118.5 501.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="150" y="350" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 380px; margin-left: 151px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need custom languages and system libraries?</div></div></div></foreignObject><text x="210" y="384" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need custom language...</text></switch></g><path d="M 371 540 Q 371 540 463.63 540" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 468.88 540 L 461.88 543.5 L 463.63 540 L 461.88 536.5 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><a xlink:href="https://cloud.google.com/appengine/docs/the-appengine-environments"><rect x="240" y="510" width="131" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 129px; height: 1px; padding-top: 540px; margin-left: 241px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Supported languages</div></div></div></foreignObject><text x="306" y="544" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Supported languages</text></switch></g></a><path d="M 530 570 Q 530 622.5 482 622.5 Q 434 622.5 434 668.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 434 673.88 L 430.5 666.88 L 434 668.63 L 437.5 666.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><path d="M 530 570 Q 530 622.5 572 622.5 Q 614 622.5 614 668.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 614 673.88 L 610.5 666.88 L 614 668.63 L 617.5 666.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="470" y="510" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 540px; margin-left: 471px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Unit of deployment</div></div></div></foreignObject><text x="530" y="544" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Unit of deployment</text></switch></g><path d="M 614 735 Q 614 735 614 911.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 614 917.07 L 610.5 910.07 L 614 911.82 L 617.5 910.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="554" y="675" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 705px; margin-left: 555px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Function</div></div></div></foreignObject><text x="614" y="709" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Function</text></switch></g><path d="M 434 735 Q 434 755 377 755 Q 320 755 320 768.63" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 320 773.88 L 316.5 766.88 L 320 768.63 L 323.5 766.88 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="374" y="675" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 705px; margin-left: 375px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Application</div></div></div></foreignObject><text x="434" y="709" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Application</text></switch></g><path d="M 320 835 Q 320 870 261.75 870 Q 203.5 870 203.5 911.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 203.5 917.07 L 200 910.07 L 203.5 911.82 L 207 910.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><path d="M 320 835 Q 320 870 371.75 870 Q 423.5 870 423.5 911.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 423.5 917.07 L 420 910.07 L 423.5 911.82 L 427 910.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><a xlink:href="https://cloud.google.com/appengine/docs/the-appengine-environments#comparing_high-level_features"><rect x="260" y="775" width="120" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 805px; margin-left: 261px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need background processes or websocket support? </div></div></div></foreignObject><text x="320" y="809" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need background proc...</text></switch></g></a><a xlink:href="https://cloud.google.com/functions/docs"><path d="M 601.71 974.24 C 599.63 974.24 597.65 973.09 596.61 970.94 L 584.41 948.96 C 583.31 947.04 583.48 944.81 584.41 943.21 L 596.71 921.22 C 597.76 919.22 599.62 918.19 601.51 918.19 L 626.21 918.19 C 628.05 918.19 629.86 919.12 630.95 921 L 643.21 942.97 C 644.69 945.29 644.18 947.75 643.34 949.13 L 631.16 970.98 C 630.34 972.75 628.5 974.24 626.13 974.24 Z" fill="#5184f3" stroke="none" pointer-events="all"/><path d="M 619.59 974.24 L 604.66 958.97 L 600.44 939.31 L 607.33 936.3 L 617.76 947.2 L 620.5 944.7 L 624.55 949.35 L 628.18 938.75 L 641.43 952.56 L 631.16 970.98 C 630.35 972.75 628.5 974.24 626.13 974.24 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"/><rect x="583.31" y="918.19" width="0" height="0" fill="none" stroke="none" pointer-events="all"/><path d="M 623.14 958.92 L 620.39 956.14 L 624.26 952.13 L 624.26 940.27 L 620.41 936.33 L 623.16 933.53 L 628.21 938.75 L 628.21 953.69 Z M 619.22 948.23 C 618.11 948.23 617.35 947.29 617.35 946.22 C 617.35 945.13 618.08 944.23 619.25 944.23 C 620.35 944.23 621.07 944.98 621.07 946.22 C 621.07 947.48 620.22 948.23 619.22 948.23 Z M 614.04 948.2 C 612.78 948.2 611.94 947.38 611.94 946.21 C 611.94 945.09 612.77 944.32 613.96 944.32 C 615.27 944.32 615.84 945.14 615.84 946.3 C 615.84 947.14 614.98 948.2 614.04 948.2 Z M 608.56 948.2 C 607.61 948.2 606.68 947.36 606.68 946.2 C 606.68 945.17 607.48 944.25 608.68 944.25 C 609.8 944.25 610.44 945.19 610.44 946.25 C 610.44 947.3 609.68 948.2 608.56 948.2 Z M 604.66 958.97 L 599.62 953.67 L 599.62 938.75 L 604.7 933.49 L 607.33 936.3 L 603.5 940.26 L 603.5 952.16 L 607.39 956.14 Z" fill="#ffffff" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 988px; margin-left: 614px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">Cloud<br />Functions</div></div></div></foreignObject><text x="614" y="999" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">Cloud...</text></switch></g></a><a xlink:href="https://cloud.google.com/anthos/run"><path d="M 405.21 405.03 C 403.13 405.03 401.15 403.88 400.11 401.73 L 387.91 379.75 C 386.81 377.83 386.98 375.6 387.91 374 L 400.21 352.01 C 401.26 350.01 403.12 348.98 405.01 348.98 L 429.71 348.98 C 431.55 348.98 433.36 349.91 434.45 351.79 L 446.71 373.76 C 448.19 376.08 447.68 378.54 446.84 379.92 L 434.66 401.77 C 433.84 403.54 432 405.03 429.63 405.03 Z" fill="#5184f3" stroke="none" pointer-events="all"/><path d="M 421.32 405.03 L 406.37 390.71 L 411.67 377 L 410.76 366.35 L 417.27 373.18 L 415.98 366.58 L 433.38 377 L 443.03 386.75 L 434.66 401.77 C 433.85 403.54 432 405.03 429.63 405.03 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"/><rect x="386.81" y="348.98" width="0" height="0" fill="none" stroke="none" pointer-events="all"/><path d="M 419.19 375.06 L 426.89 375.01 L 417.1 368.13 Z M 413.54 390.76 L 417.71 377.05 L 413.57 363.23 L 433.38 377 Z M 406.37 390.71 L 410.45 376.93 L 406.35 363.25 L 410.76 366.35 L 414 376.86 L 410.79 387.66 Z" fill="#ffffff" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 419px; margin-left: 418px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">Cloud Run for Anthos</div></div></div></foreignObject><text x="418" y="430" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">Cloud Run for Ant...</text></switch></g></a><path d="M 115 570 Q 115 600.7 80.75 600.7 Q 46.5 600.7 46.5 638.11" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 46.5 643.36 L 43 636.36 L 46.5 638.11 L 50 636.36 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><path d="M 115 570 Q 115 600 159.25 600 Q 203.5 600 203.5 911.82" fill="none" stroke="#808080" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 203.5 917.07 L 200 910.07 L 203.5 911.82 L 207 910.07 Z" fill="#808080" stroke="#808080" stroke-miterlimit="10" pointer-events="all"/><rect x="40" y="510" width="150" height="60" rx="9" ry="9" fill="#ffffff" stroke="#999999" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 148px; height: 1px; padding-top: 540px; margin-left: 41px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Need inbound HTTP Streaming (websocket) support?</div></div></div></foreignObject><text x="115" y="544" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Need inbound HTTP Streami...</text></switch></g><ellipse cx="368" cy="293" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 293px; margin-left: 349px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="368" y="297" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g><a xlink:href="https://cloud.google.com/appengine/docs"><path d="M 411.21 974.24 C 409.13 974.24 407.15 973.09 406.11 970.94 L 393.91 948.96 C 392.81 947.04 392.98 944.81 393.91 943.21 L 406.21 921.22 C 407.26 919.22 409.12 918.19 411.01 918.19 L 435.71 918.19 C 437.55 918.19 439.36 919.12 440.45 921 L 452.71 942.97 C 454.19 945.29 453.68 947.75 452.84 949.13 L 440.66 970.98 C 439.84 972.75 438 974.24 435.63 974.24 Z" fill="#5184f3" stroke="none" pointer-events="all"/><path d="M 431.3 974.24 L 405.71 948.02 L 410.86 943.27 L 412.53 945.26 L 422.45 934.94 L 420.73 933.25 L 424.19 927.93 L 440.94 945.16 L 441.15 945.14 L 449.92 954.38 L 440.66 970.98 C 439.85 972.75 438 974.24 435.63 974.24 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"/><rect x="392.81" y="918.19" width="0" height="0" fill="none" stroke="none" pointer-events="all"/><path d="M 435.9 943.2 L 440.78 944.91 C 441.21 945.1 441.26 945.21 441.26 945.6 L 441.26 947.41 C 441.26 947.99 440.9 948.27 440.39 948.27 L 435.97 948.21 C 436.3 947.07 436.21 944.91 435.9 943.2 Z M 420.73 933.25 L 422.27 928.24 C 422.34 928.02 422.47 927.79 422.74 927.79 L 423.85 927.78 C 424.1 927.78 424.27 927.96 424.36 928.2 L 426.23 933.33 C 424.96 932.88 422.59 932.86 420.73 933.25 Z M 410.81 948.32 L 406.5 948.27 C 405.78 948.27 405.54 947.99 405.54 947.53 L 405.54 945.93 C 405.54 945.19 405.81 944.87 406.34 944.69 L 410.86 943.27 C 410.68 944.68 410.46 946.43 410.81 948.32 Z M 423.5 948.69 C 424.64 948.69 425.81 947.55 425.81 946.34 C 425.81 944.88 424.79 943.69 423.4 943.69 C 422.14 943.69 420.98 944.82 420.98 946.37 C 420.98 947.48 422.05 948.69 423.5 948.69 Z M 423.51 952.13 C 421.6 952.13 420.13 951.4 419.49 950.32 L 420.56 949.34 C 419.89 948.53 419.47 947.82 419.47 946.43 C 419.47 943.58 421.9 942.27 423.33 942.27 C 424.42 942.27 425.52 942.66 426.24 943.54 L 427.27 942.39 C 428.45 943.51 428.9 944.72 428.9 946.61 C 428.9 949.57 426.85 952.13 423.51 952.13 Z M 423.47 954.73 C 427.87 954.73 431.59 950.77 431.59 946.33 C 431.59 941.22 427.53 937.73 423.36 937.73 C 419.18 937.73 415.1 941.57 415.1 946.12 C 415.1 951.53 419.86 954.73 423.47 954.73 Z M 423.4 957.57 C 416.82 957.57 412.28 951.76 412.28 946.33 C 412.28 940.85 416.42 934.86 423.5 934.86 C 429.72 934.86 434.43 940.22 434.43 946.15 C 434.43 952.96 429.23 957.57 423.4 957.57 Z" fill="#ffffff" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 988px; margin-left: 424px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">App Engine</div></div></div></foreignObject><text x="424" y="999" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">App Engine</text></switch></g></a><a xlink:href="https://cloud.google.com/run/docs"><path d="M 34.21 700.53 C 32.13 700.53 30.15 699.38 29.11 697.23 L 16.91 675.25 C 15.81 673.33 15.98 671.1 16.91 669.5 L 29.21 647.51 C 30.26 645.51 32.12 644.48 34.01 644.48 L 58.71 644.48 C 60.55 644.48 62.36 645.41 63.45 647.29 L 75.71 669.26 C 77.19 671.58 76.68 674.04 75.84 675.42 L 63.66 697.27 C 62.84 699.04 61 700.53 58.63 700.53 Z" fill="#5184f3" stroke="none" pointer-events="all"/><path d="M 50.32 700.53 L 35.37 686.21 L 40.67 672.5 L 39.76 661.85 L 46.27 668.68 L 44.98 662.08 L 62.38 672.5 L 72.03 682.25 L 63.66 697.27 C 62.85 699.04 61 700.53 58.63 700.53 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"/><rect x="15.81" y="644.48" width="0" height="0" fill="none" stroke="none" pointer-events="all"/><path d="M 48.19 670.56 L 55.89 670.51 L 46.1 663.63 Z M 42.54 686.26 L 46.71 672.55 L 42.57 658.73 L 62.38 672.5 Z M 35.37 686.21 L 39.45 672.43 L 35.35 658.75 L 39.76 661.85 L 43 672.36 L 39.79 683.16 Z" fill="#ffffff" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 715px; margin-left: 47px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">Cloud Run</div></div></div></foreignObject><text x="47" y="726" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">Cloud Run</text></switch></g></a><a xlink:href="https://cloud.google.com/appengine/docs/flexible"><path d="M 191.21 974.24 C 189.13 974.24 187.15 973.09 186.11 970.94 L 173.91 948.96 C 172.81 947.04 172.98 944.81 173.91 943.21 L 186.21 921.22 C 187.26 919.22 189.12 918.19 191.01 918.19 L 215.71 918.19 C 217.55 918.19 219.36 919.12 220.45 921 L 232.71 942.97 C 234.19 945.29 233.68 947.75 232.84 949.13 L 220.66 970.98 C 219.84 972.75 218 974.24 215.63 974.24 Z" fill="#5184f3" stroke="none" pointer-events="all"/><path d="M 211.3 974.24 L 185.71 948.02 L 190.86 943.27 L 192.53 945.26 L 202.45 934.94 L 200.73 933.25 L 204.19 927.93 L 220.94 945.16 L 221.15 945.14 L 229.92 954.38 L 220.66 970.98 C 219.85 972.75 218 974.24 215.63 974.24 Z" fill-opacity="0.07" fill="#000000" stroke="none" pointer-events="all"/><rect x="172.81" y="918.19" width="0" height="0" fill="none" stroke="none" pointer-events="all"/><path d="M 215.9 943.2 L 220.78 944.91 C 221.21 945.1 221.26 945.21 221.26 945.6 L 221.26 947.41 C 221.26 947.99 220.9 948.27 220.39 948.27 L 215.97 948.21 C 216.3 947.07 216.21 944.91 215.9 943.2 Z M 200.73 933.25 L 202.27 928.24 C 202.34 928.02 202.47 927.79 202.74 927.79 L 203.85 927.78 C 204.1 927.78 204.27 927.96 204.36 928.2 L 206.23 933.33 C 204.96 932.88 202.59 932.86 200.73 933.25 Z M 190.81 948.32 L 186.5 948.27 C 185.78 948.27 185.54 947.99 185.54 947.53 L 185.54 945.93 C 185.54 945.19 185.81 944.87 186.34 944.69 L 190.86 943.27 C 190.68 944.68 190.46 946.43 190.81 948.32 Z M 203.5 948.69 C 204.64 948.69 205.81 947.55 205.81 946.34 C 205.81 944.88 204.79 943.69 203.4 943.69 C 202.14 943.69 200.98 944.82 200.98 946.37 C 200.98 947.48 202.05 948.69 203.5 948.69 Z M 203.51 952.13 C 201.6 952.13 200.13 951.4 199.49 950.32 L 200.56 949.34 C 199.89 948.53 199.47 947.82 199.47 946.43 C 199.47 943.58 201.9 942.27 203.33 942.27 C 204.42 942.27 205.52 942.66 206.24 943.54 L 207.27 942.39 C 208.45 943.51 208.9 944.72 208.9 946.61 C 208.9 949.57 206.85 952.13 203.51 952.13 Z M 203.47 954.73 C 207.87 954.73 211.59 950.77 211.59 946.33 C 211.59 941.22 207.53 937.73 203.36 937.73 C 199.18 937.73 195.1 941.57 195.1 946.12 C 195.1 951.53 199.86 954.73 203.47 954.73 Z M 203.4 957.57 C 196.82 957.57 192.28 951.76 192.28 946.33 C 192.28 940.85 196.42 934.86 203.5 934.86 C 209.72 934.86 214.43 940.22 214.43 946.15 C 214.43 952.96 209.23 957.57 203.4 957.57 Z" fill="#ffffff" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 988px; margin-left: 204px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #999999; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: nowrap; ">App Engine<br />Flexible</div></div></div></foreignObject><text x="204" y="999" fill="#999999" font-family="Helvetica" font-size="11px" text-anchor="middle" font-weight="bold">App Engine...</text></switch></g></a><ellipse cx="276.5" cy="293" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 293px; margin-left: 258px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="277" y="297" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="259" cy="457" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 457px; margin-left: 240px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="259" y="461" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="165" cy="457" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 457px; margin-left: 146px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="165" y="461" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g><ellipse cx="160" cy="601" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 601px; margin-left: 141px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="160" y="605" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g><ellipse cx="78" cy="601.29" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 601px; margin-left: 59px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="78" y="605" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="373.5" cy="863" rx="20" ry="20" fill="#ff3333" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 863px; margin-left: 355px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">NO</font></div></div></div></foreignObject><text x="374" y="867" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">NO</text></switch></g><ellipse cx="271" cy="863" rx="20" ry="20" fill="#00994d" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 38px; height: 1px; padding-top: 863px; margin-left: 252px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; "><font color="#ffffff">YES</font></div></div></div></foreignObject><text x="271" y="867" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">YES</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://desk.draw.io/support/solutions/articles/16000042487" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>
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