var method = dataBaseModule.prototype;

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");

function dataBaseModule() {
  this.connection = mysql.createConnection({
    host: "",
    user: "shane",
    password: "devPassword",
    database: "MY_RENTAL",
  });

  this.connection.connect(function (err) {
    if (err) {
      console.log('Error Connecting to MYSQL');
      return;
    }
    console.log("Connection Established With MYSQL");
  });
};




module.exports = dataBaseModule;
