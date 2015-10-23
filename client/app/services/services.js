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

app.factory('Cookbook', function ($http) {
  
  var addRecipe = function (recipe, usernameId) {
    $http.post('/api/users/' + usernameId + '/recipes', recipe)
    .then(function(recipe) {
      return recipe;
    })
    .catch(function(error) {
      console.log('Error:' + error);
    });
  };
  
  var getRecipes = function(usernameId) {
    return $http.get('/api/users/' + usernameId + '/recipes')
    .then(function(recipes) {
      return recipes;
    })
    .catch(function(error) {
      console.log('Error:' + error);
    });
  };

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
});
