app.directive('nutrition', function() {
  return {
    restrict: 'E',
    scope: {
      nutrition: '='
    },
    link: function(scope) {
      // console.log(scope.recipeInfo);
    },
    templateUrl: 'app/templates/nutrition.html'
  };
});
