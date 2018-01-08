var method = dataBaseModule.prototype;

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '',
    user     : 'shane',
    password : 'devPassword',
    database : 'MY_RENTAL',
    charset  : 'utf8'
  }
});

var User = null;

function dataBaseModule() {

    bookshelf = require('bookshelf')(knex);

    bookshelf.plugin(require('bookshelf-check-duplicates'));

    User = bookshelf.Model.extend ({
        tableName: 'USERS',
        duplicates: ['NAME', 'EMAIL'],
    });
};

method.registerUser = (request, callBack) => {
    console.log("Registering User");
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
