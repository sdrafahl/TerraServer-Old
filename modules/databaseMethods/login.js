let bcrypt = require('bcryptjs');

let decrypt = require('./decrypt.js');

const login = (request, callBack, User) => {
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
                console.log(request.session.loggedIn);
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

module.exports = login;
