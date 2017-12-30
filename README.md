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

If you want to change or update the database you will need to first load the current database with the setup script.
After this is done you would need to change the MySQL database with whatever program you would like. After this is done
run this command.


```
cd scripts

./dumpMysql.sh

```

This will create the databaseSchema.sql file which is used to load the latest database schema.
