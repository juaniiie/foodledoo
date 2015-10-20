var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/foodle');

var db = mongoose.connection;

module.exports = db;
