app.controller('AuthController', ['$rootScope', '$state',
function($rootScope, $state) {
  $rootScope.Auth = {
    authenticated: false
  };
  this.login = function() {
    $rootScope.Auth.authenticated = true;
    $state.go('cookbook.viewrecipes');
  };
}]);
