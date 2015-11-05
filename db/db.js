var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/foodle');

var db = mongoose.connection;

module.exports = db;
