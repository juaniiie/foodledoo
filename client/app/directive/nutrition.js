app.directive('nutrition', function() {
  return {
    restrict: 'E',
    scope: {
      nutrition: '='
    },
    link: function(scope) {

      scope.modifyNutrients = function(nutrientObj, key) {
        nutrientObj.label = scope.dictionary[key];
        nutrientObj.quantity = Number(nutrientObj.quantity).toFixed(0);
        if (scope.nutrition.totalDaily[key] === undefined) {
          nutrientObj.dailyPercent = 'N/A';
        } else {
          nutrientObj.dailyPercent = scope.nutrition.totalDaily[key].quantity.toFixed(0);
        }
        return nutrientObj;
      };
      scope.$watchCollection('nutrition', function() {
        scope.nutrientsData = [];
        scope.dictionary = {
          CHOLE: 'Cholesterol',
          ENERC_KCAL: 'Calories',
          PROCNT: 'Protein',
          NA: 'Sodium',
          FAT: 'Fat',
          CHOCDF: 'Carbs',
          FIBTG: 'Fiber',
          SUGAR: 'Sugar'
        };
        for (var key in scope.nutrition.totalNutrients) {
          if (!!scope.dictionary[key]) {
            scope.nutrientsData.push(scope.modifyNutrients(scope.nutrition.totalNutrients[key], key));
          }
        }
        if (scope.nutrition.labels) {
          for (var i = 0; i < scope.nutrition.labels.length; i++) {
            scope.nutrition.labels[i] = (scope.nutrition.labels[i].toLowerCase()).replace(/_/g, ' ');
          }
        }
      });
    },
    templateUrl: 'app/templates/nutrition.html'
  };
});
