var method = dataBaseModule.prototype;

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');

var knex = null;
var User = null;

function dataBaseModule(database_config) {

    knex = require('knex')({
      client:  database_config.client,
      connection: {
        host     : database_config.host,
        user     : database_config.user,
        password : database_config.password,
        database : database_config.database,
        charset  : database_config.charset,
      }
    });

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
