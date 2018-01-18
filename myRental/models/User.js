var bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
var bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;

var User = bookshelf.Model.extend ({
    tableName: 'USERS',
    duplicates: ['NAME', 'EMAIL'],
});

var UserTest = bookshelfTest.Model.extend ({
    tableName: 'USERS',
    duplicates: ['NAME', 'EMAIL'],
});

module.exports = {
	User: User,
    UserTest: UserTest,
};
