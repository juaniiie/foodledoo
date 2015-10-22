app.controller('AuthController', ['Auth',/*'$rootScope', '$state'*/
function(Auth/*$rootScope, $state*/) {
  // $rootScope.Auth = {
  //   authenticated: false
  // };
  // this.login = function() {
  //   $rootScope.Auth.authenticated = true;
  //   $state.go('cookbook.viewrecipes');
  // };
  this.user = {
    username: null,
    password: null
  };

  this.createUser = function () {
    // vm = this;
    Auth.createUser(this.user);
  };
}]);
