#!/usr/bin/env python3

import logging
import pathlib
import subprocess
import re
import os


def main():
    curr_dir = pathlib.Path(__file__).parent.absolute()
    logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.INFO)

    lock_file_path = curr_dir / 'deploy.lock'

    # check if the deploy script is already running
    try:
        open(lock_file_path, mode='x').close()
        logging.info('Lock obtained')
    except FileExistsError:
        logging.error(
            'Deploy script is already running!\n'
            'If you are certain that no one else is deploying, you may delete the deploy.lock file and try again.'
        )
        return

    # Commented out here because server runs out of memory while running this
    # # build and deploy react front end
    # logging.info('Building and deploying frontend')
    # subprocess.run(
    #     ['docker-compose', 'up', '--build'],
    #     cwd=curr_dir / 'react',
    #     check=True
    #     )

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

    # build django backend
    logging.info('Building backend')
    subprocess.run(
        ['docker-compose', 'build'],
        cwd=curr_dir / 'django',
        check=True
        )

    # run database migrations
    logging.info('Running database migrations')
    subprocess.run(
        ['docker-compose', 'run', 'django', 'python', 'manage.py', 'migrate'],
        cwd=curr_dir / 'django',
        check=True
        )

    # start backend server
    logging.info('Running uWSGI server')
    subprocess.run(
        ['docker-compose', 'up', '--detach'],
        cwd=curr_dir / 'django',
        check=True
        )

    # remove the lock file
    os.remove(lock_file_path)
    logging.info('Released lock')



if __name__ == '__main__':
    main()
