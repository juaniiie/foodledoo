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

  auth.logIn = function (user) {
    return $http.post('/login', user)
    .success(function (data) {
      auth.saveToken(data.token);
    });
  };

  auth.logout = function () {
    $window.localStorage.removeItem('foodle-ficha');
  };
  return {
    auth: auth
  };
}]);

app.factory('Cookbook', ['$http', 'Auth', function ($http, Auth) {
  //add recipe to db
  var addRecipe = function (recipe, usernameId) {
    usernameId = '';
    return $http.post('/api/users/' + usernameId + '/recipes', recipe, {
      headers: {Authorization: 'Bearer ' + Auth.auth.getToken()}})
    .then(function () {
      return $http.get('/api/users/' + usernameId + '/recipes', null, {
        headers: {Authorization: 'Bearer ' + Auth.auth.getToken()}})
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
}]);
