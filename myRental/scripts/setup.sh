#!/bin/bash
echo "Setting up the database..."
mysql -u shane -p < ../databaseSchema.sql
echo "Setting up NPM packages..."
sudo npm install
