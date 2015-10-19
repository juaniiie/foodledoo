var express = require('express');
// var bodyParser = require('body-parser');
var app = express();

// app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

// app.get('/', function (req, res) {
//   res.sendStatus(200);
// });

// // returns all users
// app.get('/api/users', function(req, res) {
// });

// //creates new users
// app.post('/api/users', function(req, res) {

// });

// //gets user by id
// app.get('/api/users/:id', function(req, res) {
// });

// app.put('/api/users/:id', function(req, res) {
// });

// //deletes a user by id
// app.delete('/api/users/:id', function(req, res) {
// });

// Do not touch this invocation of the `listen` method
app.listen('8080', function () {
  console.log('listening on 8080');
});

// Do not touch the exports obj
// module.exports = app;