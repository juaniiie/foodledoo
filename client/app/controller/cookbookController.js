app.controller('CookbookController', ['Cookbook', 'Auth', 'API', function(Cookbook, Auth, API) {
  this.newRecipe = {};
  this.reqObj = {};
  this.eNutri = null;

  //get all recipes for one user
  this.init = function() {
    var self = this;
    Cookbook.getRecipes()
    .then(function(recipes) {
      self.recipes = recipes.data;
    });
  };

  if (Auth.auth.isLoggedIn()) {
    this.init();
  }

  //add recipe to database
  this.addRecipe = function() {
    var self = this;
    self.newRecipe.ingredients = self.newRecipe.ingredients.split('\n');
    self.newRecipe.directions = self.newRecipe.directions.split('\n');
    Cookbook.addRecipe(self.newRecipe)
    .then(function(recipes) {
      self.recipes = recipes.data;
    });
    self.newRecipe = {};
  };

  this.getNutrition = function() {
    console.log('getNutrition called');
    var self = this;
    self.reqObj.title = self.newRecipe.name;
    self.reqObj.ingr = self.newRecipe.ingredients.split('\n');
    Cookbook.getNutrition(self.reqObj)
      .then(function(nutriData) {
        self.eNutri = nutriData;
      });
  };

}]);
