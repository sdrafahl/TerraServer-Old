#!/bin/bash
sleep 2m

echo "Running Mocha Tests on Server Side."

knex migrate:rollback --env development
knex migrate:latest --env development
mocha -t 11000 --exit

echo "Running Jest tests on React Side."

cd ../TerraWeb
npm run test
npm run lint
