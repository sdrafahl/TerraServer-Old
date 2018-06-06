"use strict";

let assert = require('assert');
let MockExpress = require('mock-express');
let mysql = require("mysql");
let fs = require('fs');
let bcrypt = require('bcryptjs');
let exec = require('child_process').exec;

let Log = require('../modules/Log.js');
let DataBase = require('../modules/database.js');
let User = require('../models/UsersRequests.js').UserTest;
let Request = require('../models/UsersRequests.js').RequestTest;
let helperFunctions = require('./testRequests.js');

let database = new DataBase("test");
let logger = new Log();

console.log("Testing");

describe('Database Module Test', () => {
  beforeEach((done) => {
      exec("knex migrate:rollback --env testing", (err, stdout, stderr) => {
          exec("knex migrate:latest --env testing", (err, stdout, stderr) => {
              done();
          });
      });
  });

  describe('userController', () => {
    describe('post -> /create', () => {
      it('A user should be created', (done) => {
          let testUserRequest = helperFunctions.generateFakeUserRequest();
          database.registerUser(testUserRequest, (callBack) => {
              User.where('NAME', testUserRequest.body.username)
              .fetch()
              .then(function(user) {
                  assert.equal(user.get('NAME'), testUserRequest.body.username);
                  assert.equal(user.get('CITY'), testUserRequest.body.city);
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

    describe('post -> /login', () => {
        it('A user should be created and also be able to login', (done) => {
            let testUserRequest = helperFunctions.generateFakeUserRequest();
            database.registerUser(testUserRequest, (callBack) => {
                database.login(testUserRequest, (callBack) => {
                    assert.equal(callBack.success, true);
                    done();
                });
            });
        });
    });
  });
});

describe('requestController', () => {
    describe('post -> /handleRequest', () => {
        it('A request should be saved and associated to a user', (done) => {
            let testUserRequest = helperFunctions.generateFakeUserRequest();
            let testServiceRequest = helperFunctions.generateFakeServiceRequest();
            database.registerUser(testUserRequest, (callBack) => {
                database.handleRequest(testServiceRequest ,(callBack) => {
                    User.where('id', 1).fetch ({
                        'withRelated': ['requests']
                    }).then((user) => {
                        let request = user.related('requests').toJSON();
                        let jsonRequest = JSON.parse(request[0].JSON_REQUEST);
                        assert.equal(jsonRequest.lawnCare.height, testServiceRequest.body.serviceRequest.lawnCare.height);
                        assert.equal(request[0].price, testServiceRequest.body.serviceRequest.price);
                        done();
                    })
                    .catch((err) => {
                       assert(false);
                       done();
                    });
                });
            });
        });
        it('A request should not be created because the User is not logged in', (done) => {
            let testServiceRequest = helperFunctions.generateFakeServiceRequest4();
            let testUserRequest = helperFunctions.generateFakeUserRequest();
            database.registerUser(testUserRequest, (callBack) => {
                database.handleRequest(testServiceRequest ,(callBack) => {
                    User.where('NAME', testUserRequest.body.username).fetch({
                        'withRelated': ['requests']
                    }).then((user) => {
                        assert.equal(callBack.message, 'Cannot Make Request When Not Logged In');
                        let request = user.related('requests').toJSON();
                        assert.equal(request, '');
                        done();
                    })
                    .catch((error) => {
                       assert(false);
                       done();
                    });
                });
            });
        });
    });

    describe('post -> /searchRequest', () => {
        it('A set of requests should be created and be searched', (done) => {
            let testUserRequest = helperFunctions.generateFakeUserRequest();
            let serviceRequest1 = helperFunctions.generateFakeServiceRequest1();
            let serviceRequest2 = helperFunctions.generateFakeServiceRequest2();
            let serviceRequest3 = helperFunctions.generateFakeServiceRequest3();
            database.registerUser(testUserRequest, (cb) => {
                database.handleRequest(serviceRequest1, (cb) => {
                    database.handleRequest(serviceRequest2, (cb) => {
                        database.handleRequest(serviceRequest3, (cb) => {
                            database.searchForRequests(helperFunctions.generateSearchRequest(), (models) => {
                                assert.equal(models.data[0].streetAddress, '201 E 17th St N');
                                assert.equal(models.data[1].streetAddress, '801-1099 W 2nd St S');
                                assert.equal(models.data[2].streetAddress, '2728-2798 S 12th Ave W');
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});
