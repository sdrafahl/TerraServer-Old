let bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
let bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;

let User = bookshelf.Model.extend ({
    tableName: "USERS",
    duplicates: ["NAME", "EMAIL"],
	requests: function() {
		return this.belongsToMany(Request);
	},
});

let Request = bookshelf.Model.extend ({
    tableName: "REQUESTS",
	users: function() {
		return this.belongsToMany(User);
	},
});

module.exports = {
    User: User,
    UserTest: UserTest,
    Request: Request,
    RequestTest: RequestTest,
};
