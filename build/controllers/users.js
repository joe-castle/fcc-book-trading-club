'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _express = require('express');

var _middleware = require('../middleware');

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _local = require('../strategies/local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = (0, _express.Router)();

// const user = new Users({
//   id: 'rkYaTyo7l',
//   name: 'joe',
//   email: 'test@test.com',
//   password: '$2a$10$E0/u2Kded2tizBmRwPQVE.fsTn0E/XznK1P0HF5jNcpSWa.n/Tmrm',
//   city: 'london',
//   state: 'essex',
//   ownBooks: ['rkkiyxjXx'],
//   outboundTradeRequests: [],
//   inboundTradeRequests: [],
// });

users.put('/api/users', _middleware.ensureAuthenticated, function (req, res) {
  var user = req.user;


  if (req.body.oldPassword) {
    _bcrypt2.default.compare(req.body.oldPassword, user.password).then(function (result) {
      if (!result) {
        return res.status(400).send('Your passwords don\'t match, please try again.');
      }

      user.update({ password: req.body.newPassword }).save().then(function () {
        return res.send(user.exclude('password'));
      });
    });
  } else {
    user.update(req.body).save().then(function () {
      return res.send(user.exclude('password'));
    });
  }
});

users.post('/signup', function (req, res) {
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400).send('Please provide a name, email and password to signup.');
  } else {
    _Users2.default.findByEmail(req.body.email).then(function (user) {
      if (user) {
        res.status(409).send('A user with that email already exists, please try again.');
      } else {
        (function () {
          var newUser = new _Users2.default({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          newUser.encryptPassword().save().then(function () {
            req.login(newUser, function (err) {
              if (err) throw err;

              res.status(201).send(newUser.exclude('password'));
            });
          });
        })();
      }
    });
  }
});

users.post('/login', _local2.default.authenticate('local'), function (req, res) {
  res.send(req.user.exclude('password'));
});

users.post('/logout', function (req, res) {
  req.logout();
  res.end();
});

exports.default = users;