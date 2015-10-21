var Recipe = require('../models/Recipe');

// exports.recipes = [{
//   usernameId: 2,
//   id: 9,
//   name: 'Tuna Casserole',
//   ingredients: ['tuna', 'stuff'],
//   directions: ['make it']
// }, {
//   usernameId: 2,
//   id: 8,
//   name: 'Bean Soup with Beans',
//   ingredients: ['beans', 'water', 'salt'],
//   directions: ['boil it', 'thing']
// }, {
//   usernameId: 3,
//   id: 7,
//   name: 'Lumpia',
//   ingredients: ['banana', 'oil', 'wrapping thingy'],
//   directions: ['wrap banana', 'fry thing']
// }];

//creates new recipe
exports.addRecipe = function (recipe, callback) {
  // this.recipes.push(recipe);
  // return this.recipes;
  Recipe.create(recipe, callback);
};

//get all recipes for one user
exports.getRecipesByUserId = function (usernameId, callback) {
  usernameId = Number(usernameId);
  var userRecipes = [];
  for (var i = 0; i < this.recipes.length; i++) {
    if (this.recipes[i].usernameId === usernameId) {
      userRecipes.push(this.recipes[i]);
    }
  }
  return userRecipes;
};

//edit recipe
exports.editRecipe = function (id, newRecipe, callback) {
  id = Number(id);
  for (var i = 0; i < this.recipes.length; i++) {
    if (this.recipes[i].id === id) {
      this.recipes[i].name = newRecipe.name;
      this.recipes[i].ingredients = newRecipe.ingredients;
      this.recipes[i].directions = newRecipe.directions;
      return this.recipes[i];
    }
  }
};

//deletes recipe
exports.deleteRecipe = function (id, callback) {
  id = Number(id);
  for (var i = 0; i < this.recipes.length; i++) {
    if (this.recipes[i].id === id) {
      var temp = this.recipes[i];
      this.recipes.splice(i, 1);
      return temp;
    }
  }
};
