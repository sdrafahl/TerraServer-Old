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

function dataBaseModule() {

    bookshelf = require('bookshelf')(knex);

    exports.up = (knex) => {
        return knex.schema.createTableIfNotExists('USERS', (table) => {
            table.increments('id').primary();
            table.string('NAME');
            table.string('PASSWORD');
            table.string('EMAIL');
        });
    };

    exports.down = (knex) => {
        return knex.schema.dropTable('USERS');
    };

    var User = bookshelf.Model.extend ({
        tableName: 'USERS'
    });


};

method.registerUser = (request, callBack) => {
    console.log("Registering User");
    var password = hashPassword(request.body.password);
    var email = request.body.email;
    var username = request.body.username;

    var insert = {NAME: username, PASSWORD: password, EMAIL: email};

    knex.select("*").from("USERS").

    knex.insert(insert).into("USERS").then(() => {
        return callBack ({
            success: true,
        });
    })
}

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = dataBaseModule;
