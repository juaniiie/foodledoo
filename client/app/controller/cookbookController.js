app.controller('CookbookController', function() {
  this.newRecipe = {};

  this.addRecipe = function() {
    console.log('hi');
    var self = this;
    this.recipes.push(self.newRecipe);
    console.log(self.newRecipe);
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
