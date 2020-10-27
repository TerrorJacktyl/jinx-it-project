# NGINX Setup

We are using docker to run NGINX for better secuity over running it directly on the host system.
As such, the NGINX on the host server is disabled.
Do not renable via systemctl, docker containers are not controlled by systemd.

## Virtual Hosts

HTTP requests include a hosts header.
This enables the same server to serve different content based on the domain name.
This is controlled by the `server_name` setting.

## Reverse Proxy

Any requests made to the `md` subdomain will be forwarded on to the codimd container.
Requests to `api` will be forwarded to django.

## Static Content

NGINX also works as a static file server.
It will be used to serve the react front end code and any user provided files such as images.
