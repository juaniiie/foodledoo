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
    .success(function(recipe) {
      return recipe;
    })
    .error(function(error) {
      console.log('Error:' + error);
    });
  };
  
  var getRecipes = function(usernameId) {
    return $http.get('/api/users/' + usernameId + '/recipes')
    .success(function(recipes) {
      console.log('factory response recipes:', recipes);
      return recipes;
    })
    .error(function(error) {
      console.log('Error:' + error);
    });
  };
  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
});
