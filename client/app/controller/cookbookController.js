app.controller('CookbookController', ['Cookbook','Request', 'Auth', function(Cookbook, Request, Auth) {
  this.newRecipe = {};
  this.reqIngr = {};
  this.eNutri = {};

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
    var self = this;
    self.reqIngr.ingr = self.newRecipe.ingredients.split('\n');
    self.reqIngr.title = self.newRecipe.name;
    Request.edamamReq(self.reqIngr)
      .then(function(nutriData) {
        self.eNutri = nutriData.data;
      });
  };
}]);
