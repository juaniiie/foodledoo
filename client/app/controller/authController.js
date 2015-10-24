app.controller('AuthController', ['$scope','$state','Auth',
function($scope, $state, auth) {
  $scope.user = {};

  $scope.register = function() {
    auth.register($scope.user).error(function(error) {
      $scope.error = error;
    }).then(function() {
      //go to cookbook?
      $state.go('home');
    });
  };

  $scope.logIn = function() {
    auth.logIn($scope.user).error(function(error) {
      //for displaying errors later on
      $scope.error = error;
    }).then(function() {
      //go to cookbook?
      $state.go('home');
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
