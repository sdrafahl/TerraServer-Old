var assert = require('assert');
var MockExpress = require('mock-express');

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '',
    user     : 'shane',
    password : 'devPassword',
    database : 'MY_RENTAL_TEST',
    charset  : 'utf8'
  }
});

var app = MockExpress();

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('Database Module Test', function() {

  beforeEach(function(done) {

  });

  describe('userController', function() {
    describe('post -> /create', function() {
      it('A user should be created', function() {

      });
    });
  });

});
