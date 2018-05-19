#!/bin/bash
reset
cd ..
echo "Building docker containers"
sudo docker-compose build
echo "Running docker containers"
sudo docker-compose up
