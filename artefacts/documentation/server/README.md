# Server Setup

This is the current server setup.
You can follow this to setup your deployment in a similar fashion.
However, if you wish to deploy the codebase to a new infrastructure, follow [this guide](./fresh_deploy.md).

For more details, there are additional documentation files in the subdirectories and comments in the configuration files.

The files here are only for documentation, it may be out of sync with the current server setup.

## File System

The `/jinx` directory on the server has the group set to `jinx` which allows members to edit the files within without using `sudo`.
Everyone should have been added to this group already.

Static files to be served will be placed in `/srv`

## Docker

All processes for the operation of the site is dockerised for easy setup and security.
Docker compose is used for easy configuration.

Database files are stored in docker volumes which are managed by docker.
Static files such as the react front end is stored on the host system using bind mounts for easy access.

## Networking

### Firewall

A firewall provided by digital ocean is enabled that only enables `ssh` `http` and `https` traffic to be sent to the server.

The server also has its own firewall that follows similar rules to the digital ocean firewall.
However, the server firewall also enables protection against ssh brute force attacks.

### Docker

For enhanced security, the principle of least privilege is applied to docker networking.
Each container is only connected to containers that it needs to communicate with.
Unrelated containers are not part of the same virtual network.

For communication across containers that belong to multiple `docker-compose` files, manually defined networks are used.

Two bridge networks are set up internal isolated communication with the NGINX container.

 - `br_codimd`
 - `br_django`

These networks do not have access to the internet.
For the NGINX container to access the internet, it is connected to the internet enabled bridge network `br_internet`.

