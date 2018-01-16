var assert = require('assert');
var MockExpress = require('mock-express');
var mysql = require("mysql");
var fs = require('fs');
var bcrypt = require('bcryptjs');
var sys = require('sys');
var exec = require('child_process').exec;
var bookshelf = require('bookshelf')(knex);

var config = require('../config.json');
var DataBase = require('../modules/database.js');

var database = new DataBase(config.database_test);

var knex = require('knex')({
  client: config.database_test.client,
  connection: {
    host     : config.database_test.host,
    user     : config.database_test.user,
    password : config.database_test.password,
    database : config.database_test.database,
    charset  : config.database_test.charset,
  },
  debug: true,
});

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
      exec("knex migrate:rollback --env development", function(err, stdout, stderr) {
          console.log(stdout);
          exec("knex migrate:latest --env development", function(err, stdout, stderr) {
              console.log(stdout);
              done();
          });
      });

  });

  describe('userController', function() {
    describe('post -> /create', function() {
      it('A user should be created', (done) => {
          var testRequest = {
              body: {
                  password:"pass1",
                  email:"test@me.com",
                  username:"user1",
              }
          };
          database.registerUser(testRequest, (callBack) => {
              new User({email:"test@me.com"})
              .fetch()
              .then((model) => {
                 assert.equal(model.get('password'), testRequest.body.password);
                 done();
              })
              .catch((err) => {
                assert.equal(0,1);
                done();
              });
          });
      });
    });
  });

});
