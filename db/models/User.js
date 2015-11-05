var mongoose = require('mongoose');
var db = require('../db.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  //pbkdf2() is a key derivation function
  var hash = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  //setting expiration of jwt to 15 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 15);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.SECRET);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
