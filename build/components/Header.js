'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _materialUi = require('material-ui');

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Login() {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: '5px' } },
    _react2.default.createElement(
      _reactRouter.Link,
      { to: '/login' },
      _react2.default.createElement(_materialUi.FlatButton, { style: { color: '#fff' }, label: 'Login' })
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      { to: '/signup' },
      _react2.default.createElement(_materialUi.FlatButton, { style: { color: '#fff' }, label: 'Signup' })
    )
  );
}

function Logged(_ref) {
  var logOut = _ref.logOut;

  return _react2.default.createElement(
    _materialUi.IconMenu,
    {
      iconButtonElement: _react2.default.createElement(
        _materialUi.IconButton,
        null,
        _react2.default.createElement(_moreVert2.default, { style: { color: '#fff' } })
      ),
      targetOrigin: { horizontal: 'right', vertical: 'top' },
      anchorOrigin: { horizontal: 'right', vertical: 'top' }
    },
    _react2.default.createElement(
      _reactRouter.Link,
      { style: { textDecoration: 'none' }, to: '/allbooks' },
      _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'All Books' })
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      { style: { textDecoration: 'none' }, to: '/mybooks' },
      _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'My Books' })
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      { style: { textDecoration: 'none' }, to: '/settings' },
      _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Settings' })
    ),
    _react2.default.createElement(_materialUi.MenuItem, {
      onTouchTap: logOut,
      primaryText: 'Sign out'
    })
  );
}

function Header(_ref2) {
  var user = _ref2.user,
      dispatch = _ref2.dispatch;

  return _react2.default.createElement(_materialUi.AppBar, {
    showMenuIconButton: false,
    title: 'Book Traders',
    iconElementRight: user.id ? _react2.default.createElement(Logged, { logOut: function logOut() {
        return dispatch(_actions.Actions.LOGOUT());
      } }) : _react2.default.createElement(Login, null)
  });
}

exports.default = (0, _reactRedux.connect)(function (state) {
  return { user: state.user };
})(Header);