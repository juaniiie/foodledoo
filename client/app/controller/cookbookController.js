app.controller('CookbookController', function() {
  this.newRecipe = {};

  this.addRecipe = function() {
    var self = this;
    self.newRecipe.ingredients = self.newRecipe.ingredients.split('\n');
    self.newRecipe.directions = self.newRecipe.directions.split('\n');
    this.recipes.push(self.newRecipe);
    self.newRecipe = {};
  };

  this.recipes = [{
    name: 'Tuna Casserole',
    ingredients: ['tuna', 'stuff'],
    directions: ['make it']
  }, {
    name: 'Bean Soup with Beans',
    ingredients: ['beans', 'water', 'salt'],
    directions: ['boil it']
  }];

});
