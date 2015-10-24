app.controller('AuthController', ['$state','Auth',
function($state, Auth) {
  this.user = {};

  this.register = function() {
    var self = this;
    Auth.auth.register(self.user).error(function(error) {
      self.error = error;
    }).then(function() {
      //go to cookbook?
      $state.go('cookbook.viewrecipes');
    });
  };

  this.logIn = function() {
    var self = this;
    Auth.auth.logIn(self.user).error(function(error) {
      //for displaying errors later on
      self.error = error;
    }).then(function() {
      //go to cookbook?
      $state.go('cookbook.viewrecipes');
    });
  };
}]);

