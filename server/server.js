var express = require('express');
var jwt = require('express-jwt');
var set = require('../config/config');
var auth = jwt({secret: set.SECRET, userProperty: 'payload'});
var bodyParser = require('body-parser');
var userCtrl = require('../db/controllers/userController');
var recipeCtrl = require('../db/controllers/recipeController');
//==============auth=================
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

require('../db/models/User');
require('../config/passport');
//==================================

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

//========auth=========================================================================
app.use(passport.initialize());

//registers new user
app.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) { return next(err); }

    return res.json({token: user.generateJWT()});
  });
});

app.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

//======================================================================================
//delete users (may not need this for app)
// app.delete('/api/users/:id', function (req, res) {
//   userCtrl.deleteUserById(req.params.id, function(err, user) {
//     if (err) {
//       res.status(404).json('cannot find user');
//     } else {
//       res.status(200).json(user);
//     }
//   });
// });

//works
//creates new recipe
app.post('/api/users/:id/recipes', auth, function(req, res) {
  recipeCtrl.addRecipe(req.body, req.payload._id, function(err, recipe) {
    if (err) {
      res.status(406).json('recipe not in right format:', err);
    } else {
      res.status(200).json(recipe);
    }
  });
});

//works
//get all recipes for one user
app.get('/api/users/:id/recipes', auth, function(req, res) {
  recipeCtrl.getRecipesByUserId(req.params.id, function(err, recipes) {
    if (err) {
      res.status(404).json('recipes not found:', err);
    } else {
      res.status(200).json(recipes);
    }
  });
});

//has not been tested with auth
//edit recipe
app.put('/api/users/:id/recipes/:id', auth, function(req, res) {
  recipeCtrl.editRecipe(req.params.id, req.body, function(err, recipe) {
    if (err) {
      res.status(404).json('recipe not found:', err);
    } else {
      res.status(200).json(recipe);
    }
  });
});

//has not been tested with auth
//deletes recipe
app.delete('/api/users/:id/recipes/:id', auth, function(req, res) {
  recipeCtrl.deleteRecipe(req.params.id, function(err, recipe) {
    if (err) {
      res.status(404).json('recipe not found:', err);
    } else {
      res.status(200).json(recipe);
    }
  });
});

app.listen('8080', function() {
  console.log('listening on 8080');
});
