app.directive('nutrition', function() {
  return {
    restrict: 'E',
    scope: {
      nutrition: '='
    },
    link: function(scope) {
        console.log('nutrition info sent to directive: ', scope.nutrition);
      scope.$watchCollection('nutrition', function() {
        scope.cholesterol = scope.nutrition.totalNutrients.CHOLE;
        scope.cholesterol.quantity = Number(scope.cholesterol.quantity).toFixed(1);
        scope.cholesterol.dailyPercent = scope.nutrition.totalDaily.CHOLE.quantity.toFixed(1);

        scope.calories = scope.nutrition.totalNutrients.ENERC_KCAL;
        scope.calories.quantity = Number(scope.calories.quantity).toFixed(1);
        scope.calories.dailyPercent = scope.nutrition.totalDaily.ENERC_KCAL.quantity.toFixed(1);

        scope.protein = scope.nutrition.totalNutrients.PROCNT;
        scope.protein.quantity = Number(scope.protein.quantity).toFixed(1);
        scope.protein.dailyPercent = scope.nutrition.totalDaily.PROCNT.quantity.toFixed(1);

        scope.sodium = scope.nutrition.totalNutrients.NA;
        scope.sodium.quantity = Number(scope.sodium.quantity).toFixed(1);
        scope.sodium.dailyPercent = scope.nutrition.totalDaily.NA.quantity.toFixed(1);

        scope.fat = scope.nutrition.totalNutrients.FAT;
        scope.fat.quantity = Number(scope.fat.quantity).toFixed(1);
        scope.fat.dailyPercent = scope.nutrition.totalDaily.FAT.quantity.toFixed(1);

        scope.carbs = scope.nutrition.totalNutrients.CHOCDF;
        scope.carbs.quantity = Number(scope.carbs.quantity).toFixed(1);
        scope.carbs.dailyPercent = scope.nutrition.totalDaily.CHOCDF.quantity.toFixed(1);

        scope.fiber = scope.nutrition.totalNutrients.FIBTG;
        scope.fiber.quantity = Number(scope.fiber.quantity).toFixed(1);
        scope.fiber.dailyPercent = scope.nutrition.totalDaily.FIBTG.quantity.toFixed(1);

        scope.sugar = scope.nutrition.totalNutrients.SUGAR;
        scope.sugar.quantity = Number(scope.sugar.quantity).toFixed(1);
        // scope.sugar.dailyPercent = scope.nutrition.totalDaily.SUGAR.quantity.toFixed(1);
      });
    },
    templateUrl: 'app/templates/nutrition.html'
  };
});
