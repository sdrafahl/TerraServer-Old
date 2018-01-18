var method = dataBaseModule.prototype;

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');

var User = null;

function dataBaseModule(type) {
    if(type === "test") {
        User = require('../models/User').UserTest;
    } else {
        User = require('../models/User').User;
    }
};

method.registerUser = (request, callBack) => {
    var password = hashPassword(request.body.password);
    var email = request.body.email;
    var username = request.body.username;

    var insert = {NAME: username, PASSWORD: password, EMAIL: email};

    User.forge(insert)
        .save()
        .then((user) => {
            return callBack ({
                success: true,
            });
        })
        .catch(function (err) {
            console.log(err);
            return callBack ({
                success: false,
            });
        });
}

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = dataBaseModule;
