app.factory('Auth', function ($http) {
  var createUser = function (user) {
    $http.post('/api/users', user)
    .success(function(user) {
      return user;
    })
    .error(function(error) {
      console.log('Error:' + error);
    });
  };
  return {
    createUser: createUser,
  };
});
