# MyRental Express Server

## Starting The Service

The first thing you will need to do if you plan on using the React project with the express
service is you will need to build the react side. You will also need to build it.

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
