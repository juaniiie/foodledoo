app.factory('Auth', ['$http', '$window', function($http, $window) {
  var auth = {};

  auth.saveToken = function(token) {
    $window.localStorage['foodle-ficha'] = token;
  };

  auth.getToken = function() {
    return $window.localStorage['foodle-ficha'];
  };

  //atob() function decodes a string of data which has been encoded using base-64 encoding
  auth.isLoggedIn = function() {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.currentUserId = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload._id;
    }
  };

  auth.register = function(user) {
    return $http.post('/register', user)
    .success(function(data) {
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user) {
    return $http.post('/login', user)
    .success(function(data) {
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('foodle-ficha');
  };
  return {
    auth: auth
  };
}]);

app.factory('Cookbook', ['$http', 'Auth', 'API', function($http, Auth, API) {
  //add recipe to db
  var addRecipe = function(recipe) {
    var usernameId = Auth.auth.currentUserId();
    return $http.post('/api/users/' + usernameId + '/recipes', recipe, {
      headers: {Authorization: 'Bearer ' + Auth.auth.getToken()}})
    .then(function() {
      return $http.get('/api/users/' + usernameId + '/recipes', {
        headers: {Authorization: 'Bearer ' + Auth.auth.getToken()}})
      .then(function(recipes) {
        return recipes;
      });
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  };
  //get recipes for one user from db
  var getRecipes = function() {
    var usernameId = Auth.auth.currentUserId();
    return $http.get('/api/users/' + usernameId + '/recipes', {
      headers: {Authorization: 'Bearer ' + Auth.auth.getToken()}})
    .then(function(recipes) {
      return recipes;
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  };
  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
}]);

app.factory('Request', ['$http', 'Auth', function($http, Auth) {
  var edamamReq = function(ingr) {
    return $http.post('/api/nutrients', ingr, {
      headers: {Authorization: 'Bearer ' + Auth.auth.getToken()}})
    .then(function(data) {
      return data;
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
  };
  return {
    edamamReq: edamamReq
  };
}]);

