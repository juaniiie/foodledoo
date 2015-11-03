app.controller('CookbookController', ['Cookbook','Request', '$state', 'Auth',
function(Cookbook, Request, $state, Auth) {
  this.recipes = [];
  this.newRecipe = {};
  this.reqIngr = {};
  this.eNutri = {};

  //get all recipes for one user
  this.init = function() {
    var self = this;
    Cookbook.getRecipes()
    .then(function(recipes) {
      for (var i = 0; i < recipes.data.length; i++) {
        recipes.data[i].nutrition = JSON.parse(recipes.data[i].nutrition);
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
    console.log('nutrition object to be saved', self.eNutri);
    self.newRecipe.nutrition = JSON.stringify(self.eNutri);
    Cookbook.addRecipe(self.newRecipe)
    .then(function(recipes) {
      for (var i = 0; i < recipes.data.length; i++) {
        recipes.data[i].nutrition = JSON.parse(recipes.data[i].nutrition);
      }
      self.recipes = recipes.data;
      $state.go('cookbook.viewrecipes');
    });
    self.newRecipe = {};
    self.eNutri = {};
  };

  this.getNutrition = function() {
    var self = this;
    self.reqIngr.ingr = self.newRecipe.ingredients.split('\n');
    self.reqIngr.title = self.newRecipe.name;
    self.loading = true;
    createSpinner();
    Request.edamamReq(self.reqIngr)
      .then(function(nutriData) {
        nutriData.data.labels = nutriData.data.dietLabels.concat(nutriData.data.healthLabels);
        self.eNutri = nutriData.data;
      }).finally(function() {
        self.loading = false;
      });
  };

  this.getState = function() {
    return $state.includes('cookbook.viewrecipes');
  };

  var createSpinner = function() {
    var opts = {
      lines: 13, // The number of lines to draw
      length: 28, // The length of each line
      width: 14, // The line thickness
      radius: 42, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: '#5BC0DE', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute', // Element positioning
    };
    var target = document.getElementById('spinner');
    var spinner = new Spinner(opts).spin(target);
  };
}]);
