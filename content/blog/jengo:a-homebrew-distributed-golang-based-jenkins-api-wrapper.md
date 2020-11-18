---
title: "Jengo: A Homebrew-distributed Golang-based Jenkins API Wrapper"
description: "Recently, I have been introduced to a lot of new tools and programs. I made the switch from Windows to Mac and started using Homebrew, started coding using Go and built several pipelines using Github Actions. Next to that, in the near future I will be starting at a new client, which meant I quickly had to get some hands-on experience on Jenkins, among others. As such, I decided to combine those and build a Jenkins API wrapper in Go, "
id: "blog"
date: "2020-11-15"
author: "Tom Kennes"
audio: []
series: []
images:
- "img/blog/gopher-lamp.png"
tags: ["authentication", "jwt", "aws"]
videos: []
---
Since I am about to start at a new client, I have been busy with digging through some of the tools they use. One of those tools, and central to a lot of what they are doing, is {{<raw>}}<a href="https://www.jenkins.io/">Jenkins</a>{{</raw>}}. In order to catch up, I found myself back zifting through articles and documentation regarding old and newer versions of Jenkins. Although reading the documentation before starting is a sometimes forgotten best practice, I also want to be able to hit the ground running from day 1. E.g. I am going to need a bit more hands-on experience as well.
{{<raw>}}
<br>
<br>
{{</raw>}}

Next to that, I recently made the switch from Windows to MacOS. In the past I have made heavily use of linux machines, both professionally and personally, so I knew about {{<raw>}}<a href="https://wiki.debian.org/Apt">apt</a>{{</raw>}} for package management. Once you first make use of `sudo apt-get install ...`, there is really no going back to installing through manual downloads and installation wizards. It is simply magical. Apt-get install, watch the logs fly through the terminal and start using your downloaded application. You need an update? `sudo apt-get upgrade  ...`. You are done using it? `sudo apt-get remove ...`. While {{<raw>}}<a href="https://chocolatey.org/">Chocolatey</a>{{</raw>}} offers some of these features on Windows, it does not work quite as smooth as apt. Neither does it really stack up to its cousin for MacOS, which is what I will be using: {{<raw>}}<a href="https://brew.sh/">Homebrew</a>{{</raw>}}.
{{<raw>}}
<br>
<br>
{{</raw>}}

Finally, I have started tinkering with {{<raw>}}<a href="https://golang.org/">Go</a>{{</raw>}} recently. Go is a programming language originally created by Google in order to solve some of the problems a company like Google typically faces: tens of thousands of engineers, lots of software and systems, millions of lines of code (especially behind their network servers) being developed by hundreds of programmers, and finally lots of hardware on which all this software was launched. Nowadays it is used by many open-source projects. Personally, I love having a language as easy to write and read as python, without the slow compilation of C++ but some of its speed. 
{{<raw>}}
<br>
<br>
{{</raw>}}

Bring those three ingredients together (GO, Jenkins and Homebrew), with Jenkins as the centrepiece, one of the possible results would be a golang based Jenkins API client! Or maybe some sort of reconstruct of Jenkins using GO and homebrew, but let's not dive into that rabbit-hole. So, in order to get more experience with Jenkins, while also getting more familiar with the tools I recently started using, I decided to start creating {{<raw>}}<a href="https://Github.com/tkennes/jengo">Jengo</a>{{</raw>}}: a Jenkins API wrapper written in GO and distributed using Homebrew.
{{<raw>}}
<br>
<br>
{{</raw>}}

Next to that, by writing this up in the form of a blog-post, I hope future-me will easier retain some of it!
{{<raw>}}
<br>
<br>
<br>
{{</raw>}}



{{<raw>}}<h2 class="display-4">The Go-Part</h2> {{</raw>}}
The full code is available at {{<raw>}}<a href="https://Github.com/tkennes/jengo">here</a>{{</raw>}}, here I provide a short overview with some pointers.

{{<raw>}}<h3 class="display-5">API Requests</h3> {{</raw>}}
In order to make API requests to the Jenkins API, you either have to authenticate using username + password, or token + password. The net/http package defines a http-request-object with methods that allow you to set those:
```go
request.SetBasicAuth("jerkins-username", "jerkins-token")
```

{{<raw>}}<h3 class="display-5">Configuration</h3> {{</raw>}}
In order for the application to actually find the Jenkins server, it is necessary to define the location of the server. As such, a configuration-file is expected at ~/.jenkins.yaml. In the future it might be possible to customise this, but I am not sure whether I am going to need it.

{{<raw>}}<h3 class="display-5">Cobra</h3> {{</raw>}}
In order to abstract away some of the complexity that comes with handling user input through a CLI, I make use of a Go package called Cobra. This also means that the code is structured somewhat around it. You will find code corresponding to commands in the cmd folder, which will call functions and packages from src.

Please note that because Cobra makes use of Flags, as is the standard go testing package doing, it is necessary to keep these cmd files out of the module. Otherwise it would confuse ```go test``` as it would end up throwing bugs about missing flags you have never coded up. These modules are actually quite new to Go. They were introduced in one of the last updates, and aim to solve general dependency issues.

{{<raw>}}<h3 class="display-5">Testing</h3> {{</raw>}}
In order to prove that the code actually behaves as intended, I have included a couple of tests. Later, these are also used for testing whether new code does not introduce new bugs using Github actions. Yes, I understand that having only 4 tests in there is not going to do a whole lot of good for my overall code coverage, but you have to start somewhere. I will add more, some day, some time. Maybe. Let's see where this goes to first. 
{{<raw>}}
<br>
<br>
<br>
{{</raw>}}



{{<raw>}}<h2 class="display-4">CI/CD: Goreleaser + Github Actions</h2> {{</raw>}}
Right, so, after coding up the CLI, requests, handling and tests, it is time to take this to the next level. In order to make updating this code in the future easier (which I intend to do), and to be able to distribute this via homebrew later on, there are a couple of things that you might want to take into account:
- Automatic testing of new code commits
- Automatic packaging of the code
- Automatic generation of a Homebrew formula (next section)

{{<raw>}}<h3 class="display-5">Automatic Testing of New Code Commits</h3> {{</raw>}}
In order to achieve continuous integrating through the automation of tests, we are going to make use of Github Actions and goreleaser. Configuring a Github Action in order to run these tests we have written earlier, can be done with the following workflow:
```yml
on: [push, pull_request]
name: Test
jobs:
  test:
    strategy:
      matrix:
        go-version: [1.15.x]
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
    - name: Install Go
      uses: actions/setup-go@v2
      with:
        go-version: ${{ matrix.go-version }}
    - name: Checkout code
      uses: actions/checkout@v2
    - name: Test
      run: go test -v ./...
```
Note that we are running this test over a matrix of go-versions and operation systems. For the rest, the execution steps fairly straightforward: install the required Go version, get the code and run the tests using `go test -v ./...`. This makes sure that the tests in all the subfolders are executed, and that the output is a bit more verbose than an overall pass or fail.

If you are interested in some of the results, they are available {{<raw>}}<a href="https://Github.com/tkennes/jengo/actions">here</a>{{</raw>}}.

{{<raw>}}<h3 class="display-5">Automatic Packaging of the code</h3> {{</raw>}}
There is a neat little tool called {{<raw>}}<a href="https://goreleaser.com/quick-start/">Goreleaser</a>{{</raw>}} that does this exact thing for you. It provides functionality to automatically package go code into various forms as well as releasing that code as a Homebrew formula.

Installation works via homebrew (```brew install goreleaser/tap/goreleaser```), and you can quickly get started with an initial template using ```goreleaser init```. This creates a configuration file called .goreleaser.yml, which might require a bit of tweaking but you can get already quite far with the standard setup. See below:

```yml
before:
  hooks:
    - go mod download
    - go generate ./...
builds:
  - env:
      - CGO_ENABLED=0
    goos:
      - linux
      - windows
      - darwin
archives:
  - replacements:
      darwin: Darwin
      linux: Linux
      windows: Windows
      386: i386
      amd64: x86_64
checksum:
  name_template: 'checksums.txt'
snapshot:
  name_template: "{{ .Tag }}-next"
changelog:
  sort: asc
  filters:
    exclude:
      - '^docs:'
      - '^test:'
```
Using a second Github Action we can then automate the packaging of our code. Every time we tag a commit to be a new version, I want to trigger a new release. We can accomplish this using the Github Action describe below:

```yml
name: Release with goreleaser
on:
  push:
    tags:
      - v*.*.*
jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Unshallow Fetch
      run: git fetch --prune --unshallow
    - uses: actions/setup-go@v2
      with:
        go-version: '^1.15.0'
    - name: Release via goreleaser
      uses: goreleaser/goreleaser-action@master
      with:
        args: release
      env:
        GITHUB_TOKEN: ${{ secrets.CUSTOM_GITHUB_TOKEN}}
```
Note that this Github Action requires a Github secret called CUSTOM_GITHUB_TOKEN. Also note that it is executed if the tag is written as  "v*.*.*". This then creates the following objects:
- checksums.txt
- jengo_*.*.*_Darwin_x86_64.tar.gz
- jengo_*.*.*_Linux_i386.tar.gz
- jengo_*.*.*_Linux_x86_64.tar.gz
- jengo_*.*.*_Windows_i386.tar.gz
- jengo_*.*.*_Windows_x86_64.tar.gz
- Source code (zip)
- Source code (tar.gz) 

Click {{<raw>}}<a href="https://Github.com/tkennes/jengo/releases/tag/v1.3.10">here</a>{{</raw>}} for an example.
{{<raw>}}
<br>
<br>
<br>
{{</raw>}}

{{<raw>}}<h2 class="display-4">Integrating with Homebrew</h2> {{</raw>}}
In order to easily distribute the code, a possible approach would be Homebrew. Personally, I am in favor of tagging as much as possible along with software that is readily available on other machines. This decreases the burden of an adoption considerably, especially with less technical peers. You could off course also share the code directly, but then you might need to provide some support in installing Go, downloading the right packages, configure $GOPATH correctly and go through the build and install. Doing this once is painful, but if you have to come back for updates or with bug fixes in the future, it really slows down the process. Hence, I cannot overstate how important it is to properly package and distribute your code. Here we are using Homebrew, simply because most of my colleagues already are working with MacOS, and I wanted to gain some hands-on experience with Homebrew, taps and formulas.

Please note, in order to set this up, you have to set-up an additional repository called homebrew-__YOUR_APP__ (in my case homebrew-jengo), that stores the formula and optionally a README, license, etcetera. 

Anyhow, add the following configuration to your .goreleaser.yml-file and alter the values. Note that we are again making use of a GITHUB_TOKEN. Since this configuration is used to run the Goreleaser within the runner, GITHUB_ACTION is defined as an environment variable in the workflow configuration (see previous code block).

```yml
brews:
  -
    # GOARM to specify which 32-bit arm version to use if there are multiple versions
    # from the build section. Brew formulas support atm only one 32-bit version.
    # Default is 6 for all artifacts or each id if there a multiple versions.
    goarm: 6

    # GitHub/GitLab repository to push the formula to
    tap:
      owner: tkennes
      name: homebrew-jengo
      token: "{{ .Env.GITHUB_TOKEN }}"

    # Template for the url which is determined by the given Token (Github or gitlab)
    url_template: "http://Github.com/tkennes/jengo/releases/download/{{ .Tag }}/{{ .ArtifactName }}"

    # Git author used to commit to the repository.
    # Defaults are shown.
    commit_author:
      name: goreleaserbot
      email: goreleaser@carlosbecker.com

    # Your app's homepage.
    # Default is empty.
    homepage: "https://Github.com/tkennes/jengo"

    # Your app's description.
    # Default is empty.
    description: "Golang based CLI for Jenkins API."

    # Setting this will prevent goreleaser to actually try to commit the updated
    # formula - instead, the formula file will be stored on the dist folder only,
    # leaving the responsibility of publishing it to the user.
    # If set to auto, the release will not be uploaded to the homebrew tap
    # in case there is an indicator for prerelease in the tag e.g. v1.0.0-rc1
    # Default is false.
    skip_upload: false

    # Packages your package depends on.
    dependencies:
      - name: go
        type: build

    # So you can `brew test` your formula. 
    # This is also picked up by the homebrew-core bot
    # Default is empty.
    test: |
      assert shell_output("#{bin}/jengo version")

    # Custom install script for brew.
    # Default is 'bin.install "program"'.
    install: |
      bin.install "jengo"
```
The configuration above is used to assemble a {{<raw>}}<a href="https://www.ruby-lang.org/en/">Ruby</a>{{</raw>}}-based Homebrew formula and place it in the right location. In this case, I want it to be in this {{<raw>}}<a href="https://github.com/tomkennes/homebrew-jengo">repository</a>{{</raw>}}. The Goreleaser documentation is a bit limited, in the sense that not all configuration options and flags are explained, so you might need to just go in and test some changes yourself. However, you also have a lot of freedom in setting it up, especially with regard to the test and install steps at the bottom. This will be directly copied into the formula-definition and run as Ruby code when installing or testing the formula.

In order to keep things somewhat simple here, I basically run the jengo version command and check whether the exit code equals 0. The installation is more straightforward. Since the artefact is a binary, we can simply make use of the "bin.install" functionality. You will then end up with something like this:

```ruby
class Jengo < Formula
  desc "Golang based CLI for Jenkins API."
  homepage "https://github.com/tkennes/jengo"
  version "<some-version>/"
  bottle :unneeded

  if OS.mac?
    url "http://github.com/tkennes/jengo/releases/download/<some-version>//jengo_<some-version>/_Darwin_x86_64.tar.gz"
    sha256 "some-hash"
  end
  if OS.linux? && Hardware::CPU.intel?
    url "http://github.com/tkennes/jengo/releases/download/<some-version>/jengo_<some-version>/_Linux_x86_64.tar.gz"
    sha256 "some-other-hash"
  end
  
  depends_on "go" => :build

  def install
    bin.install "jengo"
  end

  test do
    assert shell_output("#{bin}/jengo version")
  end
end
```
Personally, I found this the most complicated step. It is difficult to assess what the impact from certain settings could be. For some you can really only find using some experimentation. Also, I had copied the initial version from Goreleaser, and I had to make quite some adjustments before I got it right for my particular case. It is working at the moment, but I also intend to further explore what options are out there and further optimise them(and maybe put them in some future post).
{{<raw>}}
<br>
<br>
<br>
{{</raw>}}

{{<raw>}}<h2 class="display-4">Conclusion</h2> {{</raw>}}
If you followed the steps outlined above, or if you have taken the shortcut of cloning the repo and changing the names and go code, you should be ready to start distributing your code!

For colleagues working on a Mac, this is the easy part:
```bash
brew tap tkennes/jengo
brew install jengo
```

For colleagues working on Linux, simply {{<raw>}}<a href="https://docs.brew.sh/Installation">install Homebrew </a>{{</raw>}}, and you are ready to go as well!

For colleagues working on with Windows... Well... {{<raw>}}
  <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Good luck!
  </a> {{</raw>}}

{{<raw>}}
<div class="collapse" id="collapseExample">
  <div class="card card-body">
<p>
Kidding!! Can you imagine?
</p>

<p>
Anyhow, I always have had to work with Windows up until a couple of weeks ago and I have promised not to become this Windows-bashing-Apple-fanboy. If you want to stick to homebrew, depending on the restrictions laid out by your IT department, you can make use of the <a href="https://medium.com/@edwardbaeg9/using-homebrew-on-windows-10-with-windows-subsystem-for-linux-wsl-c7f1792f88b3">Windows Subsystem for Linux</a>.
</p>

<p>
Alternatively, you could work directly with the Goreleaser build artifacts, but that would require some additional tooling as well. </p>

<p>
On a side-note, I believe the friendly folks at Goreleaser are looking into solving this issue for you, so you could also consider the Sit-and-Wait Strategy.
</p>
  </div>
</div>
{{</raw>}}


Upgrading and testing using brew works in a similar fashion:
```
brew upgrade jengo
```
```
brew test jengo
```
