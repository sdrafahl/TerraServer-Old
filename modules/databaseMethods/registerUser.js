let bcrypt = require('bcryptjs');
let crypto = require('crypto');

let Log = require('../Log.js');
let config = require('../../config.json');
let decrypt = require('./decrypt.js');

let logger = new Log();

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const testRegistration = (request) => {
    let emailRegularExpression = /\S+@\S+\.\S+/;
    let zipCodeRegularExpression = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let passwordLengthRequirement = 8;
    let userNameLengthRequirement = 8;

    let emailMatchesFormat = emailRegularExpression.test(request.body.email);
    let passwordIsLongEnough = request.body.password.length >= passwordLengthRequirement;
    let userNameIsLongEnough = !request.body.username || request.body.username.length >= userNameLengthRequirement;
    let zipCodeMatchesFormat = !request.body.zip || zipCodeRegularExpression.test(request.body.zip.toString());

    return emailMatchesFormat && passwordIsLongEnough && userNameIsLongEnough && zipCodeMatchesFormat;
}

const registerUser = (request, callBack, User) => {
    let {
        email,
        username,
        address,
        city,
        zip,
        state,
        password,
        country,
    } = request.body;

    console.log(request.body);

    password = hashPassword(decrypt(password));

    if(!testRegistration(request)) {
        return callBack ({
            success: false,
        });
    }

    let insert = {
        NAME: username || email || '',
        PASSWORD: password || '',
        EMAIL: email || '',
        ADDRESS: address || '',
        CITY: city || '',
        ZIP: zip || '',
        STATE: state || '',
        COUNTRY: country || '',
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
                message: err
            });
        });
}

module.exports = registerUser;
