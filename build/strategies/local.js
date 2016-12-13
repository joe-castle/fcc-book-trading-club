'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use(new _passportLocal.Strategy({
  usernameField: 'email'
}, function (email, password, done) {
  _Users2.default.findByEmail(email).then(function (user) {
    if (!user) return done(null, false);

    _bcrypt2.default.compare(password, user.password).then(function (result) {
      if (!result) return done(null, false);

      return done(null, user);
    }).catch(function (err) {
      return done(null, err);
    });
  }).catch(function (err) {
    throw err;
  });
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _Users2.default.get(id).then(function (user) {
    return done(null, user);
  });
});

exports.default = _passport2.default;