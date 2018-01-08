#!/bin/bash
echo "Setting up the database..."
mysql -u shane -p < ../databaseSchema.sql
echo "Setting up NPM packages..."
npm install knex@0.13 --save
npm install bookshelf --save
sudo npm install
