#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    echo "Please give a argument -localTest, -localBuildClean,-repoBuildClean , -repoTest, -build, -cleanBuild, or -run"
    exit 1
fi

function localTest {
    docker-compose -f docker-compose.test.local.yml up --abort-on-container-exit --exit-code-from sut
}

function repoTest {
    docker-compose -f docker-compose.test.repo.yml up --abort-on-container-exit --exit-code-from sut
}

function buildDocker {
    docker-compose build
}

function repoBuildClean {
    sudo docker system prune -a
    docker-compose -f docker-compose.test.repo.yml build
}

function localBuildClean {
    sudo docker system prune -a
    docker-compose -f docker-compose.test.local.yml build
}

function cleanBuildDocker {
    echo "Cleaning"
    docker system prune -a
    buildDocker
}

function runDocker {
    docker-compose up
}

case "$1" in
    "-localTest") localTest;;
    "-repoTest") repoTest;;
    "-localBuildClean") localBuildClean;;
    "-repoBuildClean") repoBuildClean;;
    "-build") buildDocker;;
    "-cleanBuild") cleanBuildDocker;;
    "-run") runDocker;;
esac
