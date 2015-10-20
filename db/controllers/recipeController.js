var Recipe = require('../models/Recipe');

exports.recipes = [{
  name: 'Tuna Casserole',
  ingredients: ['tuna', 'stuff'],
  directions: ['make it']
}, {
  name: 'Bean Soup with Beans',
  ingredients: ['beans', 'water', 'salt'],
  directions: ['boil it', 'thing']
}, {
  name: 'Lumpia',
  ingredients: ['banana', 'oil', 'wrapping thingy'],
  directions: ['wrap banana', 'fry thing']
}];

//creates new recipe
exports.addRecipe = function (name, ingredients, directions, callback) {

};

//edit recipe
exports.editRecipe = function (id, newRecipe, callback) {

};

//deletes recipe
exports.deleteRecipe = function (id, callback) {

};