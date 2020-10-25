# Deployment

1. `ssh` into the server
2. Change directory to `/jinx/repo`
3. Pull latest changes
4. If the server has plenty of memory, run `sudo deploy/deploy.py`. Otherwise see 4.1 - 4.3
5. Take a tea break (compiling will probably take a minute)
6. Check to see site is working properly

Stop-gap solution for cheap servers with almost no RAM (Improved solution is coming):
4.1. Ensure front end script is commented out in the `deploy.py` file
4.2. Run `sudo deploy/deploy.py`
4.3. Copy the contents of `/src/frontend/build` to `/srv/www/frontend` (consider tar-ing for faster upload)
4.4. Go to step 6 

The `deploy/django/.env` file must not be checked into git.
It contains secrets that should not be published.
