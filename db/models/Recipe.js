var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  ingredients: String,
  directions: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
