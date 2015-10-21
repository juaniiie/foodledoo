var express = require('express');
var bodyParser = require('body-parser');
var userCtrl = require('../db/controllers/userController');
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
      res.status(406).json('cannot find user');
    } else {
      res.status(200).json(user);
    }
  });
});

//delete users (may not need this for app)
app.delete('/api/users/:id', function (req, res) {
  userCtrl.deleteUserById(req.params.id, function(err, user) {
    if (err) {
      res.status(406).json('cannot find user');
    } else {
      res.status(200).json(user);
    }
  });
});

//get all recipes for one user
app.get('/api/users/:id/recipes', function (req, res) {
  //todo
});

//creates new recipe
app.post('/api/users/:id/recipes/', function (req, res) {
  //todo
});

//edit recipe
app.put('/api/users/:id/recipes/:id', function (req, res) {
  //todo
});

//deletes recipe
app.delete('/api/users/:id/recipes/:id', function (req, res) {
  //todo
});



app.listen('8080', function () {
  console.log('listening on 8080');
});
