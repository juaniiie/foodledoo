var User = require('../models/User');

//creates new user
exports.createUser = function(user, callback) {
  User.create(user, callback);
};

// returns user by id
exports.findUserById = function(id, callback) {
  User.findOne({_id: id}, callback);
};

exports.deleteUserById = function(id, callback) {
  User.findOneAndRemove({_id: id}, {}, callback);
};
