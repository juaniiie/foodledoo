var mongoose = require('mongoose');
var db = require('../db.js');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  password: String
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('hex');

  return this.hash === hash;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
