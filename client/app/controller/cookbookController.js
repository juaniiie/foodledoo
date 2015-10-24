app.controller('CookbookController', ['Cookbook', function(Cookbook) {
  
  this.newRecipe = {};

  this.usernameId = '56286aac244d7371312ed77f';
  // this.usernameId = '5628733b66a9327e3340dc74';
  // this.usernameId = '5626d29813bbc0621c02cf5f';

  //get all recipes for one user
  this.init = function () {
    console.log('init function called');
    var self = this;
    Cookbook.getRecipes(self.usernameId)
    .then(function (recipes) {
      self.recipes = recipes.data;
    });
  };
  this.init();

  //add recipe to database
  this.addRecipe = function() {
    console.log('addrecipe function called');
    var self = this;
    self.newRecipe.usernameId = self.usernameId;
    self.newRecipe.ingredients = self.newRecipe.ingredients.split('\n');
    self.newRecipe.directions = self.newRecipe.directions.split('\n');
    Cookbook.addRecipe(self.newRecipe, self.usernameId)
    .then(function (recipes) {
      console.log(recipes);
      self.recipes = recipes.data;
    });
    self.newRecipe = {};
  };

}]);
