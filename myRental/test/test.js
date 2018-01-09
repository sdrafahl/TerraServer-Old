var assert = require('assert');
var MockExpress = require('mock-express');

var app = MockExpress();

/* Fake Moka Test */
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('userController', function() {
  describe('post -> /create', function() {
    it('It should at a user to the database', function() {

    });
  });
});
