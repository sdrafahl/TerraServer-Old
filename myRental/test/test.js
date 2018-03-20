let assert = require('assert');
let MockExpress = require('mock-express');
let mysql = require("mysql");
let fs = require('fs');
let bcrypt = require('bcryptjs');
let exec = require('child_process').exec;
let crypto = require('crypto');
let faker = require('faker');

let DataBase = require('../modules/database.js');
let User = require('../models/User.js').UserTest;

let testUserRequest = generateFakeUserRequest();
let database = new DataBase("test");

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
                 console.log(err);
                 assert(false);
                 done();
              });
          });
      });
    });

    describe('post -> /login', () => {
        it('A user should be created and also be able to login', () => {
            database.registerUser(testUserRequest, (callBack) => {
                database.login(testUserRequest, (callBack) => {
                    assert.equal(callBack.success, true);
                });
            });
        });
    });
  });
});

describe('requestController', () => {

    describe('post -> /handleRequest', () => {
        it('A request should be saved and associated to a user', (done) => {
            database.handleRequest()
        });
    });
});

function generateFakeUserRequest() {
    return {
        'body': {
            'password': faker.internet.password(),
            'email': faker.internet.email(),
            'username': faker.internet.userName(),
            'address': faker.address.streetAddress(),
            'state': faker.address.state(),
            'zip': faker.address.zipCode(),
            'city': faker.address.city(),
        },
    };
}

function generateFakeServiceRequest(indexOfTest) {
    let serviceRequest = null;
    switch(indexOfTest % 3) {
        case 0:
            serviceRequest = {
                'LawnCare': {
                    'height': faker.random.number(),
                    'pattern': "stripe",
                    'fertilize': false,
                    'water': false,
                    'seeds': false,
                    'removeWeeds': false,
                    'misc': "",
                }
            };
            break;
    }

    return {
        'body': {
            'serviceRequest': serviceRequest,
            'address': faker.address.streetAddress(),
            'state': faker.address.state(),
            'zip': faker.address.zipCode(),
            'city': faker.address.city(),
        }
    }
}
