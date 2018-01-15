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
mysql -u root -p${password} -e "DELETE FROM mysql.user WHERE User = 'dev';"
mysql -u root -p${password} -e "CREATE USER 'dev' IDENTIFIED BY 'goon';"
mysql -u root -p${password} -e "GRANT ALL PRIVILEGES ON * . * TO 'dev'"

mysql -u root -p${password} -e "DELETE FROM mysql.user WHERE User = 'tester';"
mysql -u root -p${password} -e "CREATE USER 'tester' IDENTIFIED BY 'goon';"
mysql -u root -p${password} -e "GRANT ALL PRIVILEGES ON * . * TO 'tester'"
echo "Running migration"
knex migrate:latest
