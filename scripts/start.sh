#!/bin/bash
cd ..
echo "Start redis container"
docker run -d --name redis1 redis
echo "Running Container and linking to Redis container"
sudo docker run -it --link redis1:redis --name terra-app terra
