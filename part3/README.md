For running the mongodb locally run:

```shell
docker run -d -p 8000:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=changeme mongo
```