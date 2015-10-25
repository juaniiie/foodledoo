app.controller('CookbookController', ['Cookbook', function(Cookbook) {
  this.newRecipe = {};

  //get all recipes for one user
  this.init = function () {
    var self = this;
    Cookbook.getRecipes()
    .then(function (recipes) {
      self.recipes = recipes.data;
    });
  };
  
  this.init();

  //add recipe to database
  this.addRecipe = function() {
    var self = this;
    self.newRecipe.ingredients = self.newRecipe.ingredients.split('\n');
    self.newRecipe.directions = self.newRecipe.directions.split('\n');
    Cookbook.addRecipe(self.newRecipe)
    .then(function (recipes) {
      self.recipes = recipes.data;
    });
    self.newRecipe = {};
  };

}]);
