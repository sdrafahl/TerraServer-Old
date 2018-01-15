#!/bin/bash
echo "Setting up NPM packages..."
sudo npm install knex@0.13 --save
sudo npm install bookshelf --save
sudo npm install bookshelf-check-duplicates -g
sudo npm install mocha -g
sudo npm install mock-express -g
sudo npm install
echo "Setting up Databases"
echo "Enter your MySQL root password"
read password
echo "Creating dev user"
mysql -u root -p${password} -e "DROP USER 'dev'@'localhost';"
mysql -u root -p${password} -e "CREATE USER 'dev'@'localhost' IDENTIFIED BY 'goon';"
mysql -u root -p${password} -e "GRANT ALL PRIVILEGES ON * . * TO 'dev'@'localhost'"
echo "Creating test user"
mysql -u root -p${password} -e "DROP USER 'tester'@'localhost';"
mysql -u root -p${password} -e "CREATE USER 'tester'@'localhost' IDENTIFIED BY 'goon';"
mysql -u root -p${password} -e "GRANT ALL PRIVILEGES ON * . * TO 'tester'@'localhost'"
echo "Creating Databases"
mysql -u root -p${password} -e "CREATE DATABASE TERRA_TEST;"
mysql -u root -p${password} -e "CREATE DATABASE TERRA_DEV;"

echo "Running migration"
sudo knex migrate:latest --env testing
sudo knex migrate:latest --env development
