#!/bin/sh

# This script will send a json file to the discord server
# If no file is specified, the default github event message is sent

if [ -z $MESSAGE ]; then
    ENDPOINT=$DISCORD_WEBHOOK/github
    DATA=$(cat $GITHUB_EVENT_PATH)
else
    ENDPOINT=$DISCORD_WEBHOOK
    DATA="{\"content\":\"$MESSAGE\"}"
fi

curl -X POST \
    -H "Content-Type: application/json" \
    -H "X-GitHub-Event: $GITHUB_EVENT_NAME" \
    --data "$DATA" $ENDPOINT
