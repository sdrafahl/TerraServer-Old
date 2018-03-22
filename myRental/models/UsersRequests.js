let bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
let bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;

let User = bookshelf.Model.extend ({
    tableName: "USERS",
    duplicates: ["NAME", "EMAIL"],
	requests: function() {
		return this.belongsToMany(Request);
	},
});

let UserTest = bookshelfTest.Model.extend ({
    tableName: "USERS",
    duplicates: ["NAME", "EMAIL"],
	requests: function() {
		return this.belongsToMany(RequestTest);
	},
});

let Request = bookshelf.Model.extend ({
    tableName: "REQUESTS",
	users: function() {
		return this.belongsToMany(User);
	},
});

let RequestTest = bookshelfTest.Model.extend ({
    tableName: "REQUESTS",
	users: function() {
		return this.belongsToMany(UserTest);
	},
});

module.exports = {
    User: User,
    UserTest: UserTest,
    Request: Request,
    RequestTest: RequestTest,
};
