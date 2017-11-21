var port = 3000;
var express = require("express");
var app = express();
var cluster = require('cluster');

var router = require('./Node/router.js');

if(cluster.isMaster) {
    const numCPUs = require('os')
    .cpus()
    .length;
  console.log('Master Cluster is Starting...');

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', function (cluster) {
    console.log('Cluster ' + cluster.process.pid + ' is online');
  });

  cluster.on('exit', function (cluster, code, signal) {
    console.log('Cluster ' + cluster.process.pid + ' died with code: ' +
      code + ', and signal: ' + signal);
    console.log('Starting a new cluster');
    cluster.fork();
  });
} else {

  app.use("/", router);
  app.use("*", function (req, res) {
    res.sendFile(path + "404.html");
  });

  app.listen(port, function () {
    console.log("Live at Port: " + port);
  });
}
