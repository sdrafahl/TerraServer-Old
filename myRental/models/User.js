let bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
let bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;

let User = bookshelf.Model.extend ({
    tableName: 'USERS',
    duplicates: ['NAME', 'EMAIL'],
});

let UserTest = bookshelfTest.Model.extend ({
    tableName: 'USERS',
    duplicates: ['NAME', 'EMAIL'],
});

module.exports = {
	User: User,
    UserTest: UserTest,
};
