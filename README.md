# MyRental Express Server

## Starting The Service

First you will need to install Docker. After Docker is installed you will need to start docker.

```
sudo service docker start
sudo docker -d

```

Now you will need to build the docker container from the same directory as the dockerfile. You may need to install cgroup-lite to do this.

```
docker build -t <your username>/terraserver> .
```

After that you will now need to run the docker container.

```
docker run -p 49160:3002 -d <your username>/terraserver>
```

You will also need to build it.

```
npm build

```

Run the setup script to load the database schema file. The username is Shane. You will need to setup your own local mysql database on your system with that username before running the script.

```
cd scripts

./setup.sh

```

Before you can start the service you will need the google maps API key. Shane will have the api key. You will need to create a file called configKeys.json under myRental directory.

Now you need to start the redis database server for the session a directory above the scripts directory.

```
./scripts/redis.sh -start
```

Start the server

```
cd scripts

./start.sh

```

## Changing The Database

The database is created with Knex. Here is a guide.

https://alexzywiak.github.io/running-migrations-with-knex/index.html

To apply migrations run

```
knex migrate:latest

```

To roll back the migrations

```
knex migrate:rollback

```

To create a migration

```
knex migrate:make setup

```

## Testing

Express uses Mocha tests to test for functionality and unit testing.

To run the tests you can either run from the scripts directory.   

```
./tests.sh

```
Or you can run it using npm

```
npm test

```
