'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (getState) {
  function requireAuth(nextState, replace) {
    if (!getState().user.id) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }

  return _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _App2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'allbooks', component: _AllBooks2.default, onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'mybooks', component: _MyBooks2.default, onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _Signup2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'settings', component: _Settings2.default, onEnter: requireAuth })
  );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('../components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Login = require('../components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require('../components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _Settings = require('../components/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _AllBooks = require('../components/AllBooks');

var _AllBooks2 = _interopRequireDefault(_AllBooks);

var _MyBooks = require('../components/MyBooks');

var _MyBooks2 = _interopRequireDefault(_MyBooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }