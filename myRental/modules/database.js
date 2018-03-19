let method = dataBaseModule.prototype;

let fs = require('fs');
let mysql = require("mysql");
let bcrypt = require('bcryptjs');
let crypto = require('crypto');

let config = require('../config.json');
let Log = require('./Log.js');

let logger = new Log();
let User = null;
let Request = null;

function dataBaseModule(type) {
    let models = require('../models/models');
    if(type === "test") {
        User = models.UserTest;
        Request = models.RequestTest;
    } else {
        User = models.User;
        Request = models.Request;
    }
};

method.registerUser = (request, callBack) => {
    let password = hashPassword(request.body.password);
    let email = request.body.email;
    let username = request.body.username;
    let address = request.body.address;
    let city = request.body.city;
    let zip = request.body.zip;
    let state = request.body.state;

    if(!testRegistration(request)) {
        return callBack ({
            success: false,
        });
    }

    let insert = {
        NAME: username,
        PASSWORD: password,
        EMAIL: email,
        ADDRESS: address,
        CITY: city,
        ZIP: zip,
        STATE: state
    };

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

method.login = (request, callBack) => {
    let usernameOrEmail = request.body.username;
    let encryptedPassword = request.body.password;
    let password = decrypt(encryptedPassword);
    User.query((qb) => {
        qb.where('NAME', usernameOrEmail).orWhere('EMAIL', usernameOrEmail);
    }).fetch()
      .then((user) => {
        request.session.loggedIn = true;
        request.session.userId = user.
        return callBack ({success: true});
    }).catch((err) => {
        return callBack ({
            success: false,
        });
    });
}

method.handleRequest = (request, callBack) => {
    if(request.session.loggedIn) {

    } else {
        return callBack ({
            success: false,
            message: 'Cannot Make Request When Not Logged In'
        });
    }
}

function decrypt(encryptedPassword) {
    let decipher = crypto.createDecipher(config.client_side_encryption.algorithm,
        config.client_side_encryption.password);
    let password = decipher.update(encryptedPassword , 'hex', 'utf8')
    password += decipher.final('utf8');
    return password;
}

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function testRegistration(request) {
    let emailRegularExpression = /\S+@\S+\.\S+/;
    let zipCodeRegularExpression = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let passwordLengthRequirement = 8;
    let userNameLengthRequirement = 8;

    let emailMatchesFormat = emailRegularExpression.test(request.body.email);
    let passwordIsLongEnough = request.body.password.length >= passwordLengthRequirement;
    let userNameIsLongEnough = request.body.username.length >= userNameLengthRequirement;
    let zipCodeMatchesFormat = zipCodeRegularExpression.test(request.body.zip.toString());

    return emailMatchesFormat && passwordIsLongEnough && userNameIsLongEnough && zipCodeMatchesFormat;
}

module.exports = dataBaseModule;
