# Deploying The Codebase From Scratch

This is a guide on how to deploy the codebase from scratch on a new server.
If you are interested in maintaining the current deployment, check out [this file](./README.md).

## Frontend
The frontend is created with React which renders the app client-side instead of server side.
This makes deployment dead simple, just find any static file hosting service and upload the built files.
You can optionally use a CDN for faster load times.

To manually build the front end, run `npm run build` and the generated static files will be placed in `./build`.
We have scripts to do this automatically for our setup, but depending on your hosting service, you may need to write your own.
Some services (eg, Vercel) may also build the code for you, so all you need to do is to push the code.

## Backend
The backend is written in python using Django and is designed to run on an actual server.
To get started, you can use a VPS which are pretty cheap and scaleable.

Django supports multiple [deployment methods][django-deploy], we are currently using [uWSGI][uwsgi] in a docker container.
The uWSGI configuration can be found [here][uwsgi-settings]. 
If you wish to deploy with another method, the [django docs][django-deploy] are very helpful.

uWSGI does provide https support, however a simpler method for https would be to use a reverse proxy (especially if you wish to use automatic certificate renewal such as cerbot).
For the reverse proxy, we are currently using NGINX which also serves our static files.

If you wish to use your own docker-compose files or to not use docker at all, you need to ensure that the `POSTGRES_PASSWORD` and `DJANGO_SECRET_KEY` environment variables are set.
Otherwise, ensure that there is a `.env` file in `/deploy/django` with these variables for docker to use.

If you decide to change the API domain, you will need to edit the [frontend environment][frontend-env] file.

[uwsgi-settings]: https://github.com/JayZ2398/jinx-it-project/blob/master/src/backend/uwsgi.ini
[frontend-env]: https://github.com/JayZ2398/jinx-it-project/blob/master/src/frontend/.env.production
[uwsgi]: https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/uwsgi/
[django-deploy]: https://docs.djangoproject.com/en/3.1/howto/deployment/

## Database
Django supports [multiple databases][databases] and comes with an ORM. This makes it simple to choose whatever database you are most comfortable with.
Edit the django [settings file][django-settings] to set up the connection to the database.

[django-settings]: https://github.com/JayZ2398/jinx-it-project/blob/master/src/backend/jinx_project/settings.py
[databases]: https://docs.djangoproject.com/en/3.1/ref/databases/

## User Uploaded Files
The current code saves the files to the same server that's running the backend code.
However, Django supports [custom file storage backends][file-storage] if you wish to store the files somewhere else (ie, Amazon's S3).

[file-storage]: https://docs.djangoproject.com/en/3.1/howto/custom-file-storage/
