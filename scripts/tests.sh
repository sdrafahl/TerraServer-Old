#!/bin/bash
sleep 2m
knex migrate:rollback --env testing
knex migrate:latest --env testing; mocha -t 11000 --exit
mocha -t 11000 --exit
