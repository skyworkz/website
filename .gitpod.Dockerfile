FROM gitpod/workspace-full

ARG HUGO_VERSION="0.73.0"
RUN curl -LJo /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb && \
    sudo dpkg -i /tmp/hugo.deb && \
    DEBIAN_FRONTEND=noninteractive sudo apt install -y -qq libsass1 && \
    rm /tmp/hugo.deb