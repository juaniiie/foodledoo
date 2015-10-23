app.factory('Auth', function ($http) {
  var createUser = function (user) {
    $http.post('/api/users', user)
    .success(function(user) {
      return user;
    })
    .error(function(error) {
      console.log('Error:', error);
    });
  };
  return {
    createUser: createUser,
  };
});

app.factory('Cookbook', function ($http) {
  //add recipe to db
  //I dont have to return recipes
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
      console.log('Error:' + error);
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
