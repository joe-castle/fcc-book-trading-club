'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _react3 = require('./routes/react');

var _react4 = _interopRequireDefault(_react3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Root(_ref) {
  var store = _ref.store;

  return _react2.default.createElement(_reactRouter.Router, {
    history: (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store),
    routes: (0, _react4.default)(store.getState)
  });
}

Root.propTypes = {
  store: _react.PropTypes.shape({
    getState: _react.PropTypes.func,
    dispatch: _react.PropTypes.func,
    subscribe: _react.PropTypes.func
  })
};

exports.default = Root;