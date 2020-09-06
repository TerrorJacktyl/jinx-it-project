#!/usr/bin/env python3

# This script is written in python as I could not find a reliable method
# of getting the path of a bash script


import logging
import pathlib
import subprocess
import re
from time import sleep


def main():
    curr_dir = pathlib.Path(__file__).parent.absolute()
    logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.INFO)

    # build and deploy react front end
    logging.info('Deploying frontend')
    subprocess.run(
        ['docker-compose', 'up', '--build'],
        cwd=curr_dir / 'react',
        check=True
        )

    # check to see if environments file exists
    env_file_path = curr_dir / 'django' / '.env'
    if not env_file_path.is_file():
        logging.error('Expected environment file .env at %s', str(env_file_path))
        return

    # check to see if the proper keys are in the environment file
    # does a simple regex, file could still have syntax errors!
    with open(env_file_path, 'r') as file:
        data = file.read()
        if not re.search(r'^POSTGRES_PASSWORD', data, re.MULTILINE):
            logging.error('Missing POSTGRES_PASSWORD key in environment file')
            return
        if not re.search(r'^DJANGO_SECRET_KEY', data, re.MULTILINE):
            logging.error('Missing DJANGO_SECRET_KEY key in environment file')
            return

    # build and deploy django backend
    logging.info('Deploying backend')
    subprocess.run(
        ['docker-compose', 'up', '--detach', '--build'],
        cwd=curr_dir / 'django',
        check=True
        )

    # wait until django container is up
    for _ in range(0,60):
        running_containers = subprocess.check_output(
            ['docker', 'ps', '--filter', 'status=running', '--format', r'{{.Names}}'],
            encoding='utf8'
        )
        if re.search('django', running_containers):
            break
        sleep(1)
    else:
        logging.error('Django could not be started !!!')
        return

    logging.info('Running database migrations')
    # run database migrations
    subprocess.run(
        ['docker', 'exec', '-it', 'django', 'python', 'manage.py', 'migrate'],
        check=True
        )


if __name__ == '__main__':
    main()
