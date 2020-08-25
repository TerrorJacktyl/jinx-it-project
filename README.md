### How to Build

$ sudo docker-compose run django python jinx_project/manage.py migrate

I was getting a permission error when trying to build without sudo, give it a go without and see

### TODO

#### Setting up the Database
* Define a schema for our data
* Change ~/jinx_project/jinx_project/settings.py so that it uses MySQL. Still uses Sqlite at the moment

#### Development!

### Some Notes...

Database container kept stopping and restarting for some reason, even when I had manually exited. Probably not a big deal but still weird

Pretty sure ./mysql was initialised by the docker build and is what causes the permission issues. 
