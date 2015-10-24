app.factory('Auth', ['$http', '$window', function ($http, $window) {
  var auth = {};

  auth.saveToken = function (token) {
    $window.localStorage['foodle-ficha'] = token;
  };

  auth.getToken = function () {
    return $window.localStorage['foodle-ficha'];
  };

  //atob() function decodes a string of data which has been encoded using base-64 encoding
  auth.isLoggedIn = function () {
    var token = auth.getToken();

    if (token) {
      var playload = JSON.parse($window.atob(token.split('.')[1]));
      return playload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function () {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var playload = JSON.parse($window.atob(token.split('.')[1]));

      return playload.username;
    }
  };

  auth.register = function (user) {
    return $http.post('/register', user)
    .success(function (data) {
      auth.saveToken(data.token);
    });
  };

  auth.login = function (user) {
    return $http.post('/login', user)
    .success(function (data) {
      auth.saveToken(data.token);
    });
  };

  auth.logout = function () {
    $window.localStorage.removeItem('foodle-ficha');
  };
  // var createUser = function (user) {
  //   $http.post('/api/users', user)
  //   .success(function(user) {
  //     return user;
  //   }])
  //   .error(function(error) {
  //     console.log('Error:', error);
  //   });
  // };
  return {
    // createUser: createUser,
    auth: auth
  };
}]);

app.factory('Cookbook', function ($http) {
  //add recipe to db
  var addRecipe = function (recipe, usernameId) {
    return $http.post('/api/users/' + usernameId + '/recipes', recipe)
    .then(function () {
      return $http.get('/api/users/' + usernameId + '/recipes')
      .then(function (recipes) {
        return recipes;
      });
      // .catch(function (error) {
      //   console.log('Error:', error);
      // })
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  };
  //get recipes for one user from db
  var getRecipes = function (usernameId) {
    return $http.get('/api/users/' + usernameId + '/recipes')
    .then(function (recipes) {
      return recipes;
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
  };

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
});
