let method = dataBaseModule.prototype;

let fs = require('fs');
let mysql = require("mysql");
let bcrypt = require('bcryptjs');
let crypto = require('crypto');
let Geocoder = require('google-geocoder');

let config = require('../config.json');
let keys = require('../configKeys.json');
let Log = require('./Log.js');


let logger = new Log();
let User;
let Request;
let geocoder;


function dataBaseModule(type) {
    let models = require('../models/UsersRequests.js');
    if(type === "test") {
        User = models.UserTest;
        Request = models.RequestTest;
    } else {
        User = models.User;
        Request = models.Request;
    }
    geocoder = Geocoder({
        key: keys.googleMapsGeocoding,
    });
};

method.registerUser = (request, callBack) => {
    let {
        email,
        username,
        address,
        city,
        zip,
        state,
        password,
    } = request.body;

    password = hashPassword(decrypt(password));

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
    let {
        username,
        password,
    } = request.body;
    password = decrypt(password);
    User.query((qb) => {
        qb.where('NAME', username).orWhere('EMAIL', username);
    }).fetch()
      .then((user) => {
        bcrypt.compare(password, user.get('PASSWORD'), (error, response) => {
            if(response) {
                request.session.loggedIn = true;
                request.session.userId = user.get('id');
                return callBack ({success: true});
            } else {
                return callBack ({success: false});
            }
        });
    }).catch((err) => {
        return callBack ({
            success: false,
        });
    });
}

method.handleRequest = (request, callBack) => {
    if(request.session.loggedIn) {
        let {
            address,
            city,
            zip,
            state,
            serviceRequest,
            price,
            country,
        } = request.body;

        let currentDate = new Date();

        let addressString = address + " " + city + " , " + state + " " + zip + " " + country;
        geocoder.find(addressString, (error, response) => {

            let insert = {
                JSON_REQUEST: Buffer.from(JSON.stringify(serviceRequest)),
                CREATED: currentDate,
                STATE_OF_REQUEST: 'Not Processed',
                ADDRESS: address,
                CITY: city,
                ZIP: zip,
                STATE: state,
                PRICE: price,
                COUNTRY: country,
                LATITUDE: response[0].location.lat,
                LONGITUDE: response[0].location.lng,
            }

            Request.forge(insert)
                .save()
                .then((serviceRequestResponse) => {
                    return serviceRequestResponse.users().attach(request.session.userId);
                })
                .then(() => {
                    return callBack ({
                        success: true,
                    });
                })
                .catch((error) => {
                    logger.log(error);
                    return callBack ({
                        success: false,
                    });
                });
        });

    } else {
        return callBack ({
            success: false,
            message: 'Cannot Make Request When Not Logged In'
        });
    }
}

method.searchForRequests = (request, callBack) => {
    if (request.session.loggedIn) {
        let {
            max,
            address,
            city,
            state,
            zip,
            country,
        } = request.body;

        let addressString = address + " " + city + " , " + state + " " + zip + " " + country;

        geocoder.find(addressString, (error, response) => {

            Request.query((queryItem) => {
                queryItem.limit(max);
                queryItem.where('STATE_OF_REQUEST', 'Not Processed');
                queryItem.orderByRaw('SQRT(POW(' + response[0].location.lng + ' - LONGITUDE, 2) + POW(' + response[0].location.lat + '- LATITUDE , 2))');
            }).fetchAll().then((models) => {

                let listOfModels = [];

                models.forEach((model) => {
                    listOfModels.push ({
                        'lawnCareDetails': model.get('JSON_REQUEST'),
                        'created': model.get('CREATED'),
                        'status': model.get('STATE_OF_REQUEST'),
                        'streetAddress': model.get('ADDRESS'),
                        'city': model.get('CITY'),
                        'zip': model.get('ZIP'),
                        'state': model.get('STATE'),
                        'price': model.get('PRICE'),
                        'latitude': model.get('LATITUDE'),
                        'longitude': model.get('LONGITUDE'),
                        'country': model.get('COUNTRY'),
                    });
                });

                return callBack ({
                    success: true,
                    data: listOfModels,
                });
            });
        });

        } else {
            return callBack({
                success: false,
                message: 'Cannot search for request when not logged in.'
            });
        }
    }

function decrypt(encryptedPassword) {
    let decipher = crypto.createDecipher(config.client_side_encryption.algorithm,
        config.client_side_encryption.password);
    let password = decipher.update(encryptedPassword , 'hex', 'utf8');
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
