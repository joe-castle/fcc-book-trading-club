'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _materialUi = require('material-ui');

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _react3 = require('../routes/react');

var _react4 = _interopRequireDefault(_react3);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Books = require('../models/Books');

var _Books2 = _interopRequireDefault(_Books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
  var user = req.user;


  (0, _reactRouter.match)({
    routes: (0, _react4.default)(function () {
      return { user: user || {} };
    }),
    location: req.url
  }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      _Books2.default.get().then(function (books) {
        var initialState = { books: books };

        if (user) initialState.user = user.exclude('password');

        var store = (0, _redux.createStore)(_reducers2.default, initialState);

        res.send((0, _template2.default)(_react2.default.createElement(
          _materialUi.MuiThemeProvider,
          {
            muiTheme: (0, _getMuiTheme2.default)({ userAgent: req.headers['user-agent'] })
          },
          _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_reactRouter.RouterContext, renderProps)
          )
        ), store.getState()));
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
};