# MyRental Express Server

## Starting The Service

First you will need to install Docker. After Docker is installed you will need to start docker.

```
sudo service docker start
sudo docker -d

```

Before you can start the service you will need the google maps API key. Shane will have the api key. You will need to create a file called configKeys.json under myRental directory.

Now you just need to run the start script to build and run the docker containers from the scripts directory.

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
