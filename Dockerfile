FROM ubuntu

Run apt-get update

Run apt-get install curl -y

Run curl -sL https://deb.nodesource.com/setup_10.x

Run apt-get install -y nodejs

Run apt-get install -y git

run apt-get install npm -y

Run git clone https://github.com/sdrafahl/TerraServer.git

ADD configKeys.json TerraServer/

WORKDIR /TerraServer

run npm install

EXPOSE 3002

CMD PORT=3002 node bin/www
