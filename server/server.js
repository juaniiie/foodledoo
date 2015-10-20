var express = require('express');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// mongoose.connect('mongodb://localhost/foodle');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

//creates new user
app.post('/api/users', function (req, res) {

});

// returns user by id
app.get('/api/users/:id', function (req, res) {
  // todo
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


// module.exports = app;