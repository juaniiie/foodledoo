var User = require('../models/User');

//stub users
exports.users = [
  {
    id: '1',
    username: 'Juana',
    password: 'p1'
  },
  {
    id: '2',
    username: 'Phong',
    email: 'p2'
  },
  {
    id: '3',
    username: 'Seb',
    email: 'p3'
  }
];


//creates new user
exports.createUser = function (user, callback) {
  //stubs
  // this.users.push(user);
  // return this.users;
  //no stubs
  User.create(user, callback);
};

// returns user by id
exports.findUserById = function (id, callback) {
  //stub
  // for (var i = 0; i < this.users.length; i++) {
  //   if (this.users[i].id === id) {
  //     console.log(this.users[i]);
  //     return this.users[i];
  //   }
  // };
  //not stub
  User.findOne({_id: id})
   .exec(function(err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
};

