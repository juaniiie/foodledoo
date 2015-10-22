app.controller('AuthController', ['Auth',
function(Auth) {
  this.user = {
    username: null,
    password: null
  };

  this.createUser = function () {
    Auth.createUser(this.user);
  };
}]);
