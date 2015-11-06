var expect = require('chai').expect;
var request = require('supertest');
var User = require('../db/models/User.js');
var Recipe = require('../db/models/Recipe.js');
var mongoose = require('mongoose');
var should = require('should');

var dbURI = 'mongodb://localhost/foodle';

app = require('./server.js');

var clearDB = function(done) {
  mongoose.connection.collections['users'].remove(done);
}


describe('Recipe api', function () {
  //clear users before testing
  before(function(done) {
    
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI,done);
    // User.create({username: 'TestUser', password: 'password'}, function(err, res) {
    //   console.log('FIRED');
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(res);
    //   }
    // });
    // User.create(function() {
    //   user = new User({
    //     username: 'TestUser',
    //     password: 'password'
    //   });

    //   user.save(function(err) {
    //     if (err) return done(err);
    //     done();
    //   });
    // });
  });

  beforeEach(function(done) {
    clearDB(function() {
      done();
      // User.create({username: 'TestUser', password: 'password'}, done);
    });
  });

  //clears users after testing
  after(function() {
    // return User.remove().exec();
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
        token = res.body.token;
        done();
      });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
      .post('/login')
      .set('authorization', 'Bearer' + token)
      .send({
        username: 'testuser',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      // .expect(res.body.token, token)
      .end(function(err, res) {
        console.log(res);
        res.body.token.should.equal(token);
        // res.body._id.should.equal(user._id.toString());
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
  });
});
///////////
//   it('POST returns user token `/register`', function (done) {
//     var user;
//     request(app)
//       .get('/api/users')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });

//   });

//   it('responds to POST requests at `/api/users`' , function (done) {

//     var data = {
//       id: '4',
//       name: 'Josh',
//       email: 'josh@josh.com'
//     };

//     request(app)
//       .post('/api/users')
//       .send(data)
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//       });

//     request(app)
//       .get('/api/users')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });

//   });

//   it('responds to GET requests at `/api/users:id`' , function (done) {

//     var data = {
//       id: '1',
//       name: 'Taka',
//       email: 'taka@taka.com'
//     };

//     request(app)
//       .get('/api/users/1')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });

//   });

//   it('responds to PUT requests at `/api/users:id`', function (done) {

//     var data = {
//       id: '1',
//       name: 'Taka-san',
//       email: 'taka@taka.com'
//     };

//     request(app)
//       .put('/api/users/1')
//       .send(data)
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//       });

//     request(app)
//       .get('/api/users/1')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });

//   });

//   it('responds to DELETE requests at `/api/users:id`', function (done) {

//     var data = {
//       id: '2',
//       name: 'Nayo',
//       email: 'nayo@nayo.com'
//     };

//     request(app)
//       .delete('/api/users/2')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//       });

//     request(app)
//       .get('/api/users/')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });

//   });

// });
