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
$ docker-compose run django python manage.py migrate

# run
$ docker-compose up

# rebuild
$ docker-compose build
```

Having trouble building? Look under Notes header :)

## Mucking around

### Attach shells to specific containers

It's often useful to attach terminals to running containers, or run specific commands inside of them. To open a shell in a container of your choice:

1. Get the list of containers running by typing in a shell:
```bash
$ docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                    NAMES
80ccc0de6cbb        jinx-it-project_django   "python manage.py ru…"   4 hours ago         Up 25 minutes       0.0.0.0:8080->8000/tcp   jinx_django
fd793468d6ab        postgres                 "docker-entrypoint.s…"   4 hours ago         Up 25 minutes       5432/tcp                 jinx_db
```
2. Choose the container you want to access and note down its name in the `NAMES` column.
3. Connect to the container with:
```bash
$ docker exec -it <container name> bash
```
4. You can also substitute `bash` with any command you like. For instance:
```bash
$ docker exec -it jinx_django python manage.py migrate
```

### Making API requests to Django

To make a sign up and query it yourself:
1. Run the containers and head to `0.0.0.0:8080/api`. Login with credentials below.
1. Create a sign up object.
1. Open up a django shell in the `jinx_django` container with:
```bash
$ docker exec -it jinx_django manage.py bash
```
4. [Muck around as per this article](https://docs.djangoproject.com/en/3.1/intro/tutorial02/#playing-with-the-api):

```python
>>> from sign_up.models import SignUp
# get pk of existing sign ups so we can get one
>>> for o in SignUp.objects.all():
...     print(o.pk)
>>> q = SignUp.objects.get(pk=2)
# serializing
>>> from sign_up.serializers import SignUpSerializer
>>> mySignUp = SignUpSerializer(q)
>>> mySignUp.data
# yay, json!
{'first_name': 'Jack', 'last_name': 'Zezula', 'email': 'jackzezula@tuta.io', 'password': 'jackzezula'}
```

### Interacting with the database

If you need to edit the database manually (e.g. creating new roles, editing their permissions) rather than through Django's models interface, you can do the following.

1. Run the containers and attach a shell to the `jinx_db` container:
```bash
$ docker-compose up
$ docker exec -it jinx_db bash
```
2. Interact with PostgreSQL with the `psql` command. For instance, you can log onto the `jinx_db` database within the PostgreSQL system with:
```bash
$ psql -d jinx_db -U jinx
```
3. From here you can perform regular SQL queries, along with PostgreSQL commands like:
```sql
> CREATE USER jack WITH LOGIN PASSWORD 'jacksSecretPassword';
> \du -- list users and their permissions
> \c jinx_db jack -- logon to the jinx_db database as user jack
> \l -- list databases with owner
```

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

User: `jinx`\
Pass: `jinxadminpassword`
