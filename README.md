# Jinx backend

This branch uses Docker to configure:
1. Django
1. PostgreSQL
1. **an api?**

### Preliminary note: permissions

You'll need sudo access to run `docker` and `docker-compose`. However, it's **recommended** to [create a new `docker` group and add yourself to it](https://docs.docker.com/engine/install/linux-postinstall/) to avoid invoking sudo all the time. Avoiding this and running docker with sudo may cause permissions for certain files to be revoked from your non-root user, requiring you to use `sudo` when you run docker in future.

If you run `docker` or `docker-compose` with `sudo`, please make sure you *revert file ownership to* `$USER` for all files by running (from the root project directory `jinx-it-project`):

```bash
$ sudo chown -R $USER:$USER .
```

## Building

```bash
# first build, or a rebuild after changing requirements.txt
$ docker-compose run django python jinx_project/manage.py migrate

# run
$ docker-compose up

# rebuild
$ docker-compose build
```

Having trouble building? Look under Notes header :)

## To do

#### Setting up the Database
- [ x ] Change `~/jinx_project/jinx_project/settings.py` so that it uses Postgres.
- [ x ] Define a schema for our data.
- [ x ] Configure models in Django and get it CRUDing with the DB.
- [  ] Create a basic API allowing the front end some CRUD functionality through Django.

## Development!

### Some Notes...

Jiles: I was having some issues with the initial build. If it doesn't work for you with the specified order, and is complaining about psycopg2, don't worry! Try the build instructions from bottom to top, first building the django container, then both containers with docker-compose up, and finally the top command with manage.py.

## Issues

### Changing `docker-compose.yml` doesn't change the database

You might be trying to add users to the database by changing `POSTGRES_USER`, `POSTGRES_PASSWORD` in the `db` environment variables for `docker-compose.yml`. To your horror, it won't work, and it's because this information in `docker-compose.yml` *only affects the database the **first** time it's built*.

To resolve this, you'll need to remove the database image (`postgres` for us) with:

```bash
$ docker rmi postgresql
```

If another image isn't updating when you change its configuration in `docker-compose.yml`, try:
1. Finding the name of the image (under the `REPOSITORY` column in output) with:

```bash
$ docker images
```

2. Remove the image `imagename` with:

```bash
$ docker rmi <imagename>
```

3. Or if you're adventurous, it's 3 AM or a quarter to *fuck it*, kill all your images with:

```bash
# won't somebody think of the children!
$ docker image prune -a
```

## Superuser

User: jinx
Pass: jinxadminpassword
