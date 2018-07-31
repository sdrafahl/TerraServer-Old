let method = dataBaseModule.prototype;

let fs = require('fs');
let mysql = require("mysql");
let bcrypt = require('bcryptjs');
let Geocoder = require('google-geocoder');

let keys = require('../configKeys.json');
let Log = require('./Log.js');
let registerUser = require('./databaseMethods/registerUser.js');
let login = require('./databaseMethods/login.js');
let handleRequest = require('./databaseMethods/handleRequest.js');
let searchForRequests = require('./databaseMethods/searchForRequest.js');
let decrypt = require('./databaseMethods/decrypt.js').decrypt;

let logger = new Log();
let User;
let Request;
let geocoder;

function dataBaseModule() {
    let models = require('../models/UsersRequests.js');
    User = models.User;
    Request = models.Request;
    geocoder = Geocoder({
        key: keys.googleMapsGeocoding,
    });
};

method.registerUser = (request, callBack) => {
    registerUser.registerUser(request, callBack, User);
}

method.login = (request, callBack) => {
    login(request, callBack, User);
}

method.handleRequest = (request, callBack) => {
    handleRequest(request, callBack, Request, geocoder);
}

method.searchForRequests = (request, callBack) => {
    searchForRequests(request, callBack, Request, geocoder);
}

module.exports = dataBaseModule;
