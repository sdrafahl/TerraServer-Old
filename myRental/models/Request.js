let bookshelf = require('../modules/bookshelfConfig.js').bookshelf;
let bookshelfTest = require('../modules/bookshelfConfig.js').bookshelfTest;
let requestSpecification = require('./Request.json');

let Request = bookshelf.Model.extend (requestSpecification);
let RequestTest = bookshelfTest.Model.extend (requestSpecification);

module.exports = {
	Request: Request,
    RequestTest: RequestTest,
};
