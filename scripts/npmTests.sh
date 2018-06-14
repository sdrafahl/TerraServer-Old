#!/bin/bash
sleep 2m

echo "Running Mocha Tests on Server Side."

knex migrate:rollback --env testing
knex migrate:latest --env testing; mocha -t 11000 --exit
mocha -t 11000 --exit

echo "Running Jest tests on React Side."

cd ../TerraWeb
npm run test
npm run lint
