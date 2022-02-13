FROM ubuntu:latest
WORKDIR /website
RUN apt update && DEBIAN_FRONTEND=noninteractive apt install -y -qq nodejs npm hugo 
ENTRYPOINT ["sh","-c"]
