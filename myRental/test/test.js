var assert = require('assert');
var MockExpress = require('mock-express');
var mysql = require("mysql");
var fs = require('fs');
var bcrypt = require('bcryptjs');
var sys = require('sys');
var exec = require('child_process').exec;

var DataBase = require('../modules/database.js');
var testUserRequest = require('./testUserRequest.json');
var User = require('../models/User.js').UserTest;

var database = new DataBase("test");

describe('Database Module Test', function() {
  beforeEach(function(done) {
      exec("knex migrate:rollback --env testing", function(err, stdout, stderr) {
          exec("knex migrate:latest --env testing", function(err, stdout, stderr) {
              done();
          });
      });
  });

  describe('userController', function() {
    describe('post -> /create', function() {
      it('A user should be created', (done) => {
          database.registerUser(testUserRequest, (callBack) => {
              User.where('NAME', testUserRequest.body.username)
              .fetch()
              .then(function(user) {
                  assert.equal(user.get('NAME'), testUserRequest.body.username);
                  assert.equal(callBack.success, true);
                  done();
              })
              .catch((err) => {
                 assert(false);
                 done();
              });
          });
      });
    });
  });
});
