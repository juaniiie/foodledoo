var expect = require('chai').expect;
var request = require('supertest');
var User = require('../db/models/User.js');
var Recipe = require('../db/models/Recipe.js');
var mongoose = require('mongoose');
var should = require('should');

var dbURI = 'mongodb://localhost/foodle';

app = require('./server.js');

//clears db before each test
var clearDB = function(done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('Server API Routes', function() {
  //connects to db before testing
  before(function(done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  beforeEach(function(done) {
    clearDB(function() {
      done();
    });
  });

  //clears users after testing
  after(function() {
    return User.remove().exec();
  });

  describe('POST /register', function() {
    var token;

    beforeEach(function(done) {
      request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        console.log('res===================', res);
        token = res.body.token;
        done();
      });
    });

    it('should respond with a user token when authenticated', function(done) {
      request(app)
      .post('/login')
      .set('authorization', 'Bearer' + token)
      .send({
        username: 'testuser',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        res.body.token.should.equal(token);
        done();
      });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
      .post('/login')
      .send({username: 'testuser', password: 'foo'})
      .expect(401)
      .end(done);
    });

    // it('should create a recipe', function(done) {
    //   var
    //   request(app)
    //   .post('/api/users/'+  +'/recipes')
    //   .set('authorization', 'Bearer' + token)
    // })
/* NEED TO DECODE THE TOKEN
  use: var jwt = require('jsonwebtoken');
*/

  });
});
