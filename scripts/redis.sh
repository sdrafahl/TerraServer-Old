#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    echo "Please give a argument -restart, -start, -status, or -kill"
    exit 1
fi

function getStatusOfRedis
{
  echo "Redis Active Status:"
  sudo systemctl is-active redis-server
  echo "Redis Enabled Status:"
  sudo systemctl is-enabled redis-server
}

function startRedis
{
  echo "Starting Redis"
  redis-server redis.conf & redis-cli
}

function turnOffRedis
{
  echo "Turning off Redis"
  sudo systemctl disable redis-server
  sudo systemctl stop redis-server
}

if [ "$1" == "-restart" ]
  then
  echo "Restarting Redis"
  getStatusOfRedis
  turnOffRedis
  getStatusOfRedis
  startRedis
  getStatusOfRedis
fi

if [ "$1" == "-start" ]
  then
    startRedis
fi

if ["$1" == "-kill"]
  then
    turnOffRedis
fi

if ["$1" == "-status"]
  then
    getStatusOfRedis
fi
