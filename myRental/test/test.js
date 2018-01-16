var assert = require('assert');
var MockExpress = require('mock-express');
var mysql = require("mysql");
var fs = require('fs');
var bcrypt = require('bcryptjs');
var sys = require('sys');
var exec = require('child_process').exec;
var config = require('../config.json');
var knex = require('knex')({

  client: config.database_test.client,
  connection: {
    host     : config.database_test.host,
    user     : config.database_test.user,
    password : config.database_test.password,
    database : config.database_test.database,
    charset  : config.database_test.charset,
  },
});

var bookshelf = require('bookshelf')(knex);


var DataBase = require('../modules/database.js');

var database = new DataBase(config.database_test);

let testRequest = {
    body: {
        password:'pass1',
        email:'test@me.com',
        username:'user1',
    }
};

User = bookshelf.Model.extend ({
    tableName: 'USERS',
    duplicates: ['NAME', 'EMAIL'],
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
      exec("knex migrate:rollback --env testing", function(err, stdout, stderr) {
          exec("knex migrate:latest --env testing", function(err, stdout, stderr) {
              database.registerUser(testRequest, (callBack) => {
                  done();
              });
          });
      });
  });

  describe('userController', function() {
    describe('post -> /create', function() {
      it('A user should be created', (done) => {
          User.where('NAME', testRequest.body.username)
          .fetch()
          .then(function(user) {
              assert.equal(user.get('NAME'), testRequest.body.username);
              done();
          })
          .catch((err) => {
             assert.equal(1,0);
             done();
          });
      });
    });
  });
});
