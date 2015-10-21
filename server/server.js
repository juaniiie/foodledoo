var express = require('express');
var bodyParser = require('body-parser');
var userCtrl = require('../db/controllers/userController');
var recipeCtrl = require('../db/controllers/recipeController');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

//creates new user
app.post('/api/users', function (req, res) {
  userCtrl.createUser(req.body, function(err, user) {
    if (err) {
      res.status(406).json('Not acceptable user fields');
    } else {
      res.status(200).json(user);
    }
  });
});

// returns user by id
app.get('/api/users/:id', function (req, res) {
  userCtrl.findUserById(req.params.id, function(err, user) {
    if (err) {
      res.status(404).json('cannot find user');
    } else {
      res.status(200).json(user);
    }
  });
});

//delete users (may not need this for app)
app.delete('/api/users/:id', function (req, res) {
  userCtrl.deleteUserById(req.params.id, function(err, user) {
    if (err) {
      res.status(404).json('cannot find user');
    } else {
      res.status(200).json(user);
    }
  });
});

//creates new recipe
// try using different data field type 
app.post('/api/users/:id/recipes/', function (req, res) {
  // res.status(200).json(recipeCtrl.addRecipe(req.body));
  recipeCtrl.addRecipe(req.body, function(err, recipe) {
    if (err) {
      res.status(406).json(err);
    } else {
      res.status(200).json(recipe);
    }
  });
});

//get all recipes for one user
//current spot
app.get('/api/users/:id/recipes', function (req, res) {
  // res.status(200).json(recipeCtrl.getRecipesByUserId(req.params.id));
  recipeCtrl.editRecipe(req.params.id, req.body, function(err, recipe) {
    if (err) {
      res.status(406).json(err);
    } else {
      res.status(200).json(recipe);
    }
  });
});

//edit recipe
app.put('/api/users/:id/recipes/:id', function (req, res) {
  res.status(200).json(recipeCtrl.editRecipe(req.params.id, req.body));
});

//deletes recipe
app.delete('/api/users/:id/recipes/:id', function (req, res) {
  res.status(200).json(recipeCtrl.deleteRecipe(req.params.id));
});

app.listen('8080', function () {
  console.log('listening on 8080');
});
