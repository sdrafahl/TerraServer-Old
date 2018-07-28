let models = require('../../models/UsersRequests.js');

const User = models.User;

const registerUser = (request, callBack) => {
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
        STATE: state,
        COUNTRY: country,
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

module.exports.registerUser = registerUser;
