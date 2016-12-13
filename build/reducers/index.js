'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _books = require('./books');

var _books2 = _interopRequireDefault(_books);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  books: _books2.default,
  user: _user2.default,
  error: _error2.default,
  routing: _reactRouterRedux.routerReducer
});