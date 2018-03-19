let bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
let bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;

let userSpecification = {
    tableName: "USERS",
    duplicates: ["NAME", "EMAIL"],
	pages: function() {
		return this.belongsToMany(Request);
	},
}

let requestSpecification = {
    tableName: "REQUESTS",
	pages: function() {
		return this.belongsToMany(User);
	},
}

let User = bookshelf.Model.extend (userSpecification);
let UserTest = bookshelfTest.Model.extend (userSpecification);
let Request = bookshelf.Model.extend (requestSpecification);
let RequestTest = bookshelfTest.Model.extend (requestSpecification);

module.exports = {
	Request: Request,
    RequestTest: RequestTest,
	User: User,
	UserTest: UserTest,
};
