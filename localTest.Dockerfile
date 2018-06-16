FROM ubuntu

Run apt-get update

Run apt-get install curl -y

Run curl -sL https://deb.nodesource.com/setup_10.x

Run apt-get install -y nodejs

Run apt-get install -y git

Run apt-get install npm -y

Run git clone https://github.com/sdrafahl/TerraWeb.git

WORKDIR /TerraWeb

Run npm install

Run npm run build

WORKDIR ../

Run mkdir TerraServer

ADD . /TerraServer

WORKDIR /TerraServer

Run npm install

Run npm install -g knex

Run apt-get install mysql-client -y

EXPOSE 3000
