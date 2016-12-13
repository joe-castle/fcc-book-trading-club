'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectRedis = require('connect-redis');

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _local = require('../strategies/local');

var _local2 = _interopRequireDefault(_local);

var _serverRender = require('../server-render');

var _serverRender2 = _interopRequireDefault(_serverRender);

var _books = require('../controllers/books');

var _books2 = _interopRequireDefault(_books);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var RedisStore = (0, _connectRedis2.default)(_expressSession2.default);

app.use('/assets', _express2.default.static(__dirname + '/../assets')).use(_bodyParser2.default.json()).use((0, _cookieParser2.default)()).use((0, _expressSession2.default)({
  store: new RedisStore({ client: _client2.default }),
  secret: 'NEEDS TO BE CHANGED',
  resave: false,
  saveUninitialized: false
})).use(_local2.default.initialize()).use(_local2.default.session()).use(_books2.default).use(_users2.default).get('*', _serverRender2.default);

exports.default = app;