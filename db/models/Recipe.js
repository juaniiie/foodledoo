var mongoose = require('mongoose');
var db = require('../db.js');

var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  //check out populate method
  // usernameId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  usernameId: Number,
  name: String,
  ingredients: [String],
  directions: [String]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
