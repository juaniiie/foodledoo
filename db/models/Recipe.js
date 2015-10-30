var mongoose = require('mongoose');
var db = require('../db.js');

var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  usernameId: String,
  name: String,
  ingredients: [String],
  directions: [String],
  nutrition: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
