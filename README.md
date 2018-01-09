# MyRental Express Server

## Starting The Service

Run the setup script to load the database schema file. The username is Shane. You will need to setup your own local
mysql database on your system with that username before running the script.

```
cd scripts

./setup.sh

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
