FROM debian:11
MAINTAINER Michael <miklblitz@yandex.ru>

RUN apt update -qq
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential libpq-dev net-tools \
    nodejs dialog nano git autoconf libglib2.0-dev wget gettext mailutils bash gawk \
    postfix && \
    rm -rf /var/cache/apk/* && \
    mkdir -p /var/log/supervisor/ /var/run/supervisor/ && \
    sed -i -e 's/inet_interfaces = localhost/inet_interfaces = all/g' /etc/postfix/main.cf

COPY . .
COPY main.cf /etc/postfix/main.cf

EXPOSE 25
ENTRYPOINT service postfix start && /bin/bash