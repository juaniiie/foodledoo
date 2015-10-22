app.controller('CookbookController', ['Cookbook', function(Cookbook) {
  this.newRecipe = {};

  // this.recipes = null;

  this.usernameId = '56286aac244d7371312ed77f';
  // this.usernameId = '5628733b66a9327e3340dc74';
  // this.usernameId = '5626d29813bbc0621c02cf5f';

  //get all recipes for one user
  this.init = function () {
    console.log('init function called');
    console.log('usernameId in init', this.usernameId);
    this.recipes = Cookbook.getRecipes(this.usernameId);
    console.log('recipes:', this.recipes);
  };

  this.init();

  this.addRecipe = function() {
    this.newRecipe.usernameId = this.usernameId;
    this.newRecipe.ingredients = this.newRecipe.ingredients.split('\n');
    this.newRecipe.directions = this.newRecipe.directions.split('\n');
    Cookbook.addRecipe(this.newRecipe, this.usernameId);
    this.newRecipe = {};
  };

}]);
