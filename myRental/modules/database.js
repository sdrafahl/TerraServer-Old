let method = dataBaseModule.prototype;

let fs = require('fs');
let mysql = require("mysql");
let bcrypt = require('bcryptjs');

let Logger = require('./Log.js');

let User = null;
let logger = null;

function dataBaseModule(type) {
    logger = new Logger();
    if(type === "test") {
        User = require('../models/User').UserTest;
    } else {
        User = require('../models/User').User;
    }
};

method.registerUser = (request, callBack) => {
    let password = hashPassword(request.body.password);
    let email = request.body.email;
    let username = request.body.username;

    let insert = {NAME: username, PASSWORD: password, EMAIL: email};

    User.forge(insert)
        .save()
        .then((user) => {
            return callBack ({
                success: true,
            });
        })
        .catch(function (err) {
            logger.log(err);
            return callBack ({
                success: false,
            });
        });
}

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = dataBaseModule;
