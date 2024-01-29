FROM ubuntu:focal

ARG HUGO_VERSION="0.73.0"
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update && \
    apt install -y -qq curl dpkg && \
    curl -LJo /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb && \
    dpkg --install /tmp/hugo.deb && \
    apt install -y -qq nodejs npm libsass1 && \
    apt clean
RUN rm /tmp/hugo.deb

WORKDIR /website
ENTRYPOINT ["sh","-c"]
