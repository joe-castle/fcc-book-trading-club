'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _materialUi = require('material-ui');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = exports.App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(
          'main',
          { style: { maxWidth: '960px', margin: '0 auto', padding: '10px' } },
          this.props.children
        ),
        _react2.default.createElement(_materialUi.Snackbar, {
          open: this.props.open,
          action: 'x',
          message: this.props.message,
          autoHideDuration: 4000,
          onActionTouchTap: function onActionTouchTap() {
            return _this2.props.dispatch(_actions.Actions.CLOSE_ERROR());
          },
          onRequestClose: function onRequestClose() {
            return _this2.props.dispatch(_actions.Actions.CLOSE_ERROR());
          }
        }),
        _react2.default.createElement(_materialUi.Divider, { style: { marginTop: '25px' } }),
        _react2.default.createElement(
          'footer',
          { style: { maxWidth: '960px', margin: '25px auto', padding: '10px', textAlign: 'center' } },
          'Created as part of the ',
          _react2.default.createElement(
            'a',
            { href: 'http://www.freecodecamp.com', target: '_blank' },
            'freecodecamp.com'
          ),
          ' curriculum. Source @ ',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/joesmith100/fcc-book-trading-club', target: '_blank' },
            'GitHub'
          ),
          '.'
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.propTypes = {
  children: _react.PropTypes.element
};
exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    open: state.error.open,
    message: state.error.message
  };
})(App);