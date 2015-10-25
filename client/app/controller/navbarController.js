app.controller('NavbarController', ['Auth',

function(Auth) {

  this.isLoggedIn = Auth.auth.isLoggedIn;
  this.currentUser = Auth.auth.currentUser;
  this.logOut = Auth.auth.logOut;

}]);
