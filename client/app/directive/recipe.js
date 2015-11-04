app.directive('recipe', function() {
  return {
    restrict: 'E',
    scope: {
      recipeInfo: '='
    },
    link: function(scope) {
      // console.log(scope.recipeInfo);
      //tabs state variables and functions
      scope.display = true;
      scope.tableState = true;
      scope.chartState = false;

      scope.tableTab = function() {
        scope.display = !scope.display;
        scope.tableState = true;
        scope.chartState = false;
      };

      scope.chartTab = function() {
        scope.display = !scope.display;
        scope.chartState = true;
        scope.tableState = false;
      };
    },
    templateUrl: 'app/templates/recipe.html'
  };
});
