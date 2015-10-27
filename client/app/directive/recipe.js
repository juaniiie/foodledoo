app.directive('recipe', function() {
  return {
    restrict: 'E',
    scope: {
      recipeInfo: '='
    },
    link: function(scope) {
      // console.log(scope.recipeInfo);
    },
    templateUrl: 'app/templates/recipe.html'
  };
});
