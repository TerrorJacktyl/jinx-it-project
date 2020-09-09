#!/bin/sh
# building on the server takes a long time so we only copy over the built
# files once building is completed
npm run build

mkdir -p /build

echo Clearing out /build
rm -r /build/*

echo Copying over files
cp -r /code/build/* /build
