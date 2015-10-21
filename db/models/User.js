var mongoose = require('mongoose');
var db = require('../db.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
