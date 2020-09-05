# building on the server takes a long time so we only copy over the built
# files once building is completed
npm run build

mkdir /build
cp -r /code/build /build
