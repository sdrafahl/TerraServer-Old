FROM ubuntu

Run apt-get update

Run apt-get install curl -y

Run curl -sL https://deb.nodesource.com/setup_10.x

Run apt-get install -y nodejs

Run apt-get install -y git

Run apt-get install npm -y

Run apt-get update -y

Run git clone https://github.com/sdrafahl/TerraWeb.git

WORKDIR /TerraWeb

Run npm install -g --save npm@latest

Run npm install --dev

Run npm run build

WORKDIR ../

Run git clone https://github.com/sdrafahl/TerraServer.git

ADD configKeys.json TerraServer/

WORKDIR /TerraServer

Run npm install

Run npm install -g knex

Run apt-get install mysql-client -y

EXPOSE 3005

CMD npm start
