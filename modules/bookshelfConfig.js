let fs = require('fs');

let config = require('../config.json');

let testDatabaseConfig = config.database_test;
let devDatabaseConfig = config.database_dev;

if (fs.existsSync("../passwords.json")) {
    let passwords = require("../passwords.json");
    testDatabaseConfig.connection.password = passwords.database;
    devDatabaseConfig.connection.password = passwords.database;
}

testDatabaseConfig.config = process.env.mysql_PORT;
console.log(process.env.mysql_PORT);

let knexTest = require('knex')(testDatabaseConfig);
let knex = require('knex')(devDatabaseConfig);
let bookshelfTest = require('bookshelf')(knexTest);
let bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-check-duplicates'));
bookshelfTest.plugin(require('bookshelf-check-duplicates'));

module.exports.bookshelfTest = bookshelfTest;
module.exports.bookshelf = bookshelf;
