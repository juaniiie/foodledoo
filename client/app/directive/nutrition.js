app.directive('nutrition', function() {
  return {
    restrict: 'E',
    scope: {
      nutrition: '='
    },
    link: function(scope) {
      console.log('scope.nutrition', scope.nutrition);

      scope.nutrientsData = [];
      //
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

      scope.modifyNutrients = function(nutrientObj, key) {
        nutrientObj.label = scope.dictionary[key];
        nutrientObj.quantity = Number(nutrientObj.quantity).toFixed(1);
        if (scope.nutrition.totalDaily[key] === undefined) {
          nutrientObj.dailyPercent = 'N/A';
        } else {
          nutrientObj.dailyPercent = scope.nutrition.totalDaily[key].quantity.toFixed(1);
        }
        // console.log(nutrientObj);
        return nutrientObj;
      };

      for (var key in scope.nutrition.totalNutrients) {
        if (!!scope.dictionary[key]) {
          scope.nutrientsData.push(scope.modifyNutrients(scope.nutrition.totalNutrients[key], key));
        }
      }
    },
    templateUrl: 'app/templates/nutrition.html'
  };
});
