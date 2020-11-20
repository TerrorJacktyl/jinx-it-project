# Jinx ePortfolio App

A platform where anyone from enthusiasts to professionals can create stunning portfolios that showcase their crafts and projects, and share them with the world.

Live demo at [`app.jinx.systems`](https://app.jinx.systems/).

The rest of this document serves as *general installation and technical advice*. If you're after project management, scope and SCRUM related documents, see the `documentation` folder.

##  1. <a name='Tableofcontents'></a>Table of contents

<!-- vscode-markdown-toc -->
* 1. [Table of contents](#Tableofcontents)
* 2. [Getting started](#Gettingstarted)
* 3. [Stack](#Stack)
* 4. [Guides and advice](#Guidesandadvice)
	* 4.1. [Preliminary note: permissions on Linux](#Preliminarynote:permissionsonLinux)
* 5. [Project file structure](#Projectfilestructure)
	* 5.1. [Building and running](#Buildingandrunning)
	* 5.2. [Attach shells to running Docker containers](#AttachshellstorunningDockercontainers)
	* 5.3. [Making API requests to Django](#MakingAPIrequeststoDjango)
	* 5.4. [API documentation](#APIdocumentation)
	* 5.5. [Interacting with the database](#Interactingwiththedatabase)
* 6. [Issues and fixes](#Issuesandfixes)
	* 6.1. [The database doesn't reset on a rebuild](#Thedatabasedoesntresetonarebuild)
	* 6.2. [Something's terribly wrong! How do I 'reset'?](#SomethingsterriblywrongHowdoIreset)
	* 6.3. [The build instructions not working](#Thebuildinstructionsnotworking)
	* 6.4. [Material UI icons won't load](#MaterialUIiconswontload)
	* 6.5. [Modifying Django models doesn't work](#ModifyingDjangomodelsdoesntwork)
	* 6.6. [Map undefined error on line zero](#Mapundefinederroronlinezero)
	* 6.7. [Modifying files gives `device or resource busy`](#Modifyingfilesgivesdeviceorresourcebusy)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->[![AGPLv3 License](https://img.shields.io/badge/License-AGPL%20v3-yellow.svg)](https://www.gnu.org/licenses/agpl-3.0.en.html)

##  2. <a name='Gettingstarted'></a>Getting started

To build and run the app, you'll need [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system.

1. From the root of the project, run the project for the first time by running this command in a terminal:

```bash
docker-compose run --build
```

2. Go make a coffee - this will take between 1-10 minutes depending on your computer's processing power.

3. You'll know the app is running when you can see some lines on the terminal with `jinx_react` or `jinx_django` at the beginning of each line.

4. Access the app in your web browser on [`localhost:3000`](http://localhost:3000). If you want to play around with the back end, head to [`localhost:8080/admin`](http://localhost:8080/admin).

5. Close the app by pressing <kbd>Ctrl</kbd><kbd>c</kbd> in the terminal, and patiently wait for the app to close.

6. To run the app again, simply run from the project root:

```bash
docker-compose up
```

##  3. <a name='Stack'></a>Stack

Our app runs with the following components:

1. The PostgreSQL database stores textual data (i.e. account data, portfolio text, paths to images). The Linux filesystem holds media (i.e. images, pdfs, videos).
2. The Django backend exposes the API endpoints (`/api` and `/auth`), and handles CRUD operations on the database.
3. The React frontend defines the user interface and structure of the web pages (i.e. home, edit page, account settings).

---

# Development

If you're looking at working on the project, the sections below should help if you run into bugs or trouble.

##  4. <a name='Guidesandadvice'></a>Guides and advice

###  4.1. <a name='Preliminarynote:permissionsonLinux'></a>Preliminary note: permissions on Linux

You'll need sudo access to run `docker` and `docker-compose`. However, it's **recommended** to [create a new `docker` group and add yourself to it](https://docs.docker.com/engine/install/linux-postinstall/) to avoid invoking sudo all the time. Avoiding this and running docker with sudo may cause permissions for certain files to be revoked from your non-root user, requiring you to use `sudo` when you run docker in future.

If you run `docker` or `docker-compose` with `sudo`, please make sure you _revert file ownership to_ `$USER` for all files by running (from the root project directory `jinx-it-project`):

```bash
$ sudo chown -R $USER:$USER .
```

##  5. <a name='Projectfilestructure'></a>Project file structure

| Folder   | Contains                                              |
| -------- | ----------------------------------------------------- |
| `deploy` | Files specific to the production environment.         |
| `env`    | Environment variables specific to development.        |
| `src`    | Source code for frontend (React) and backend (Djagno) |

###  5.1. <a name='Buildingandrunning'></a>Building and running

These are all the build commands you should need:

```bash
# build (standard)
$ docker-compose build

# build after removing packages from requirements.txt
$ docker-compose build --no-cache
```

Likewise, these are all the run commands you should need:

```bash
# run
$ docker-compose up

# after changing database models (i.e. any changes to a models.py file)
$ docker-compose run django python manage.py makemigrations && python manage.py migrate
```

###  5.2. <a name='AttachshellstorunningDockercontainers'></a>Attach shells to running Docker containers

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

###  5.3. <a name='MakingAPIrequeststoDjango'></a>Making API requests to Django

Using the frontend's sign up page:

1. If it's building successfully the frontend should be accessible through `localhost:3000`. Click sign up in the top right hand corner, and enter some stuff in the fields. If you get a sign up error, then something is cooked and consult the build instructions under issues (probably haven't migrated the DB).
2. If there is no error, then head to `127.0.0.1:8080/api/sign_up`, you should hopefully see the details that you've just entered!

To make a sign up and query it yourself:

1. Run the containers and head to `0.0.0.0:8080/api`. Login with credentials below.
1. Create a sign up object.
1. Open up a django shell in the `jinx_django` container with:

```bash
$ docker exec -it jinx_django manage.py shell
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

###  5.4. <a name='APIdocumentation'></a>API documentation

This application uses Swagger to automatically document the API. You can access it by running the server and going to `localhost:8080/swagger` in your web browser.

See [drf-yasg documentation](https://drf-yasg.readthedocs.io/en/stable/) for more information.

###  5.5. <a name='Interactingwiththedatabase'></a>Interacting with the database

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

---

##  6. <a name='Issuesandfixes'></a>Issues and fixes

This is a list of issues we've encountered and some solutions for them. If you resolve an issue, please add them here!

###  6.1. <a name='Thedatabasedoesntresetonarebuild'></a>The database doesn't reset on a rebuild

You might want to change various aspects of the database, i.e:

1. Wiping the data from the database
2. Changing the database settings in `docker-compose.yml` under `db`
3. Changing a model that will affect existing data in the database

In these situations, _a rebuild will not be enough_. You will need to remove the database image from Docker. **Warning: this will delete any data in your database.** Before you do your next rebuild, run:

```bash
docker rmi postgres
```

With regard to point 2, this is necessary because the information in `docker-compose.yml` _only affects the database the **first** time it's built_.

###  6.2. <a name='SomethingsterriblywrongHowdoIreset'></a>Something's terribly wrong! How do I 'reset'?

If you've done something like manually installing, updating or editing dependencies within the containers, you might run into some bugs.

If rebuilding doesn't solve your issues, a harder reset is deleting the image.

1. Find the name of the image (under the `REPOSITORY` column in output) with:

```bash
docker images
```

2. Remove the image `imagename` with:

```bash
docker rmi <imagename>
```

3. Or if you're adventurous or it's 3 AM, kill all your images with:

```bash
# won't somebody think of the children!
docker image prune -a
```

###  6.3. <a name='Thebuildinstructionsnotworking'></a>The build instructions not working

First, make sure to delete any old images of the project using `docker rmi <imagename>` as specified above. Then try building all the required images from scratch using `docker-compose build`. Since the database is built from scratch, django models must be migrated using `docker-compose run django python manage.py migrate`. Everything should now be ready to go, so you can run the containers with `docker-compose up`. Happy hacking!

###  6.4. <a name='MaterialUIiconswontload'></a>Material UI icons won't load

If you are getting problems loading Material-UI icons, you might need to do a full system rebuild (`docker system prune -a` before a build).

###  6.5. <a name='ModifyingDjangomodelsdoesntwork'></a>Modifying Django models doesn't work

When you run `manage.py makemigrations`, you get:

> `You are trying to add a non-nullable field 'page' to section without a default; we can't do that (the database needs something to populate existing rows).`

To fix this:

1. Comment out the model in question (`page`)
2. From the `jinx_django`container (or via `docker-compose run django <command>`) run:

```bash
./manage.py makemigrations && ./manage.py migrate
```

###  6.6. <a name='Mapundefinederroronlinezero'></a>Map undefined error on line zero

This is a strange error, likely caused by issues between recent releases of TypeScript, React scripts and ES-Lint, which resulted in us downgrading to TypeScript 3.9.7.

Ensuring that `src/frontend/package.json` contains the line `"typescript": "^3.9.7",` and doing a full rebuild should fix this issue.

###  6.7. <a name='Modifyingfilesgivesdeviceorresourcebusy'></a>Modifying files gives `device or resource busy`

This happens because Docker has still mounted a folder (such as `src/frontend`) through a volume, and deleting it would confuse Docker. Jack encountered this error trying to delete the whole repository on Windows (WSL2). To fix:
1. Remove all Docker containers which depend on the file you can't modify/delete. If you're not sure, remove everything with `docker system prune -a` in your Linux shell.
2. Shutdown WSL from cmd/powershell with `wsl --shutdown`.
3. Restart WSL and your Linux shell. Modify files.
