#!/bin/bash
echo "Setting up NPM packages..."
npm install knex@0.13 --save
npm install bookshelf --save
npm install bookshelf-check-duplicates -g
npm install mocha -g
npm install mock-express -g
npm install mysql
npm install bcrypt
npm install bcryptjs
npm install redis-session
npm install faker
npm install
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
knex migrate:latest --env testing
knex migrate:latest --env development
