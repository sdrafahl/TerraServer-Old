let fs = require('fs');

let config = require('../config.json');
let devDatabaseConfig = config.database;

if (fs.existsSync("../passwords.json")) {
    let passwords = require("../passwords.json");
    devDatabaseConfig.connection.password = passwords.database;
}

let knex = require('knex')(devDatabaseConfig);
let bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-check-duplicates'));

module.exports.bookshelf = bookshelf;
