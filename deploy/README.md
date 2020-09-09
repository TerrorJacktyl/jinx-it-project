# Deployment

1. `ssh` into the server
2. Change directory to `/jinx/repo`
3. Pull latest changes
4. Run `sudo deploy/deploy.sh`
6. Take a tea break (compiling will probably take a minute)
5. Check to see site is working properly

The `deploy/django/.env` file must not be checked into git.
It contains secrets that should not be published.
