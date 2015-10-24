var Recipe = require('../models/Recipe');

//creates new recipe
exports.addRecipe = function (recipe, usernameId, callback) {
  recipe.usernameId = usernameId;
  Recipe.create(recipe, callback);
};

//get all recipes for one user
exports.getRecipesByUserId = function (usernameId, callback) {
  Recipe.find({usernameId: usernameId}, callback);
};

//edit recipe
exports.editRecipe = function (id, newRecipe, callback) {
  Recipe.findByIdAndUpdate(id, newRecipe, {}, callback);
};

//deletes recipe
exports.deleteRecipe = function (id, callback) {
  Recipe.findOneAndRemove({_id: id}, {}, callback);
};
