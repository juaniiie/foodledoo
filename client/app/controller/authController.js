app.controller('AuthController', ['$scope','$state','Auth',
function($scope, $state, Auth) {
  $scope.user = {};

  $scope.register = function() {
    console.log('register function called');
    Auth.auth.register($scope.user).error(function(error) {
      $scope.error = error;
    }).then(function() {
      //go to cookbook?
      $state.go('cookbook.viewrecipes');
    });
  };

  $scope.logIn = function() {
    Auth.auth.logIn($scope.user).error(function(error) {
      //for displaying errors later on
      $scope.error = error;
    }).then(function() {
      //go to cookbook?
      $state.go('cookbook.viewrecipes');
    });
  };
}]);

//before auth refactor
// app.controller('AuthController', ['Auth',
// function(Auth) {
//   this.user = {
//     username: null,
//     password: null
//   };

//   this.createUser = function () {
//     Auth.createUser(this.user);
//   };
// }]);
