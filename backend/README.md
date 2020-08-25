# Backend Docker Setup

These files should be stored in the same directory as django's `manage.py`.

To run the docker containers, use `docker-compose up`.
To keep running in the background, append the `-d` flag.

The mysql database is currently configured to use a folder in this directory to store its files.
If you want to use docker volumes, uncomment the commented lines in `docker-compose.yml` and comment out the existing volume line.


