app.controller('CookbookController', ['Cookbook','Request', 'Auth', function(Cookbook, Request, Auth) {
  this.recipes = [];
  this.newRecipe = {};
  this.reqIngr = {};
  this.eNutri = {};
  this.loading = true;

  //get all recipes for one user
  this.init = function() {
    var self = this;
    Cookbook.getRecipes()
    .then(function(recipes) {
      for (var i = 0; i < recipes.data.length; i++) {
        recipes.data[i].nutrition = JSON.parse(recipes.data[i].nutrition);
        recipes.data[i].nutrition.labels = recipes.data[i].nutrition.dietLabels.concat(recipes.data[i].nutrition.healthLabels);
      }
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
    self.newRecipe.nutrition = JSON.stringify(self.eNutri);
    Cookbook.addRecipe(self.newRecipe)
    .then(function(recipes) {
      for (var i = 0; i < recipes.data.length; i++) {
        recipes.data[i].nutrition = JSON.parse(recipes.data[i].nutrition);
        recipes.data[i].labels = recipes.data[i].dietLabels.concat(recipes.data[i].healthLabels);
      }
      self.recipes = recipes.data;
    });
    self.newRecipe = {};
    self.eNutri = {};
    self.loading = true;
  };

  this.getNutrition = function() {
    var self = this;
    self.reqIngr.ingr = self.newRecipe.ingredients.split('\n');
    self.reqIngr.title = self.newRecipe.name;
    Request.edamamReq(self.reqIngr)
      .then(function(nutriData) {
        nutriData.data.labels = nutriData.data.dietLabels.concat(nutriData.data.healthLabels);
        self.eNutri = nutriData.data;
        self.loading = false;
      });
  };
}]);
