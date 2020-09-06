#!/usr/bin/env python3

# This script is written in python as I could not find a reliable method
# of getting the path of a bash script


import pathlib
import subprocess

curr_dir = pathlib.Path(__file__).parent.absolute()

# build and deploy react front end
print('Deploying frontend')
subprocess.run(
    ['docker-compose', 'up', '--build'],
    cwd=curr_dir / 'react',
    check=True
    )

print('Deploying backend')
# build and deploy django backend
subprocess.run(
    ['docker-compose', 'up', '--detach', '--build'],
    cwd=curr_dir / 'django',
    check=True
    )

print('Running database migrations')
# run database migrations
subprocess.run(
    ['docker', 'exec', '-it', 'django', 'python', 'manage.py', 'migrate'],
    check=True
    )
