var config = require('../config.json');
var knexTest = require('knex')(config.database_test);
var knex = require('knex')(config.database_dev);
var bookshelfTest = require('bookshelf')(knexTest);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin(require('bookshelf-check-duplicates'));
bookshelfTest.plugin(require('bookshelf-check-duplicates'));

module.exports.bookshelfTest = bookshelfTest;
module.exports.bookshelf = bookshelf;
