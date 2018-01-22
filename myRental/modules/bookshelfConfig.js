let config = require('../config.json');
let knexTest = require('knex')(config.database_test);
let knex = require('knex')(config.database_dev);
let bookshelfTest = require('bookshelf')(knexTest);
let bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-check-duplicates'));
bookshelfTest.plugin(require('bookshelf-check-duplicates'));

module.exports.bookshelfTest = bookshelfTest;
module.exports.bookshelf = bookshelf;
