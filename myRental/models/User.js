let bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
let bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;
let userSpecification = require('./User.json');

let User = bookshelf.Model.extend (userSpecification);
let UserTest = bookshelfTest.Model.extend (userSpecification);

module.exports = {
	User: User,
    UserTest: UserTest,
};
