"use strict";

let assert = require('assert');
let MockExpress = require('mock-express');
let mysql = require("mysql");
let fs = require('fs');
let bcrypt = require('bcryptjs');
let exec = require('child_process').exec;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

let Log = require('../modules/Log.js');
let DataBase = require('../modules/database.js');
let User = require('../models/UsersRequests.js').User;
let Request = require('../models/UsersRequests.js').Request;
let helperFunctions = require('./testRequests.js');
let server = require('../app.js');

let database = new DataBase();
let logger = new Log();
chai.use(chaiHttp);

  describe('userController', () => {
    describe('post -> /create', () => {
      it('A user should be created', () => {
          let testUserRequest = helperFunctions.generateFakeUserRequest();
          database.registerUser(testUserRequest, (callBack) => {
              User.where('NAME', testUserRequest.body.username)
              .fetch()
              .then(function(user) {
                  assert.equal(user.get('NAME'), testUserRequest.body.username);
                  assert.equal(user.get('CITY'), testUserRequest.body.city);
                  assert.equal(callBack.success, true);
              })
              .catch((error) => {
                 logger.log(error);
                 assert(false);
              });
          });
      });
    });

    describe('post -> /login', () => {
        it('A user should be created and also be able to login', () => {
            let testUserRequest = helperFunctions.generateFakeUserRequest();
            database.registerUser(testUserRequest, (cb) => {
                database.login(testUserRequest, (callBack) => {
                    assert.equal(callBack.success, true);
                });
            });
        });
    });

    describe('post -> /isLoggedIn', () => {
        it('isLoggedIn should return false if not logged in.', () => {
            chai.request(server)
                .post('/users/isLoggedIn')
                .end((error, result) => {
                    result.should.have.status(200);
                    result.body.should.have.property('loggedIn').eql(false);
                });
        });
        it('isLoggedIn should return true after logging in.', () => {
            let testUserRequest = helperFunctions.generateFakeUserRequest();
            database.registerUser(testUserRequest, (callBack) => {
                chai.request(server)
                    .post('/users/login')
                    .send({
                        username: testUserRequest.body.username,
                        password: testUserRequest.body.password
                     })
                    .end((error, result) => {
                        result.should.have.status(200);
                        result.body.should.have.property('success').eql(true);
                        chai.request(server)
                            .post('/users/isLoggedIn')
                            .end((error, result) => {
                                result.should.have.status(200);
                                result.body.should.have.property('loggedIn').eql(true);
                            });
                    });
            });
        });
    });
  });

describe('requestController', () => {
    describe('post -> /handleRequest', () => {
        it('A request should be saved and associated to a user', () => {
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
                    })
                    .catch((err) => {
                       assert(false);
                    });
                });
            });
        });
    });

    describe('post -> /searchRequest', () => {
        it('A set of requests should be created and be searched', () => {
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
                            });
                        });
                    });
                });
            });
        });
    });
});
