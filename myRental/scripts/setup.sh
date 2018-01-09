#!/bin/bash
echo "Setting up NPM packages..."
sudo npm install knex@0.13 --save
sudo npm install bookshelf --save
sudo npm install bookshelf-check-duplicates -g
sudo npm install mocha -g
sudo npm install mock-express -g
sudo npm install
