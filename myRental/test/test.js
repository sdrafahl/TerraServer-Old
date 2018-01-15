var assert = require('assert');
var MockExpress = require('mock-express');
var mysql = require("mysql");
var fs = require('fs');
var bcrypt = require('bcryptjs');

var config = require('./config.json');

var knex = require('knex')({
  client: config.database_test.test,
  connection: {
    host     : config.database_test.host,
    user     : config.database_test.user,
    password : config.database_test.password,
    database : config.database_test.database,
    charset  : config.database_test.charset,
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
