'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _materialUi = require('material-ui');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup() {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this));

    _this.state = {
      name: '',
      email: '',
      password: ''
    };
    return _this;
  }

  _createClass(Signup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Signup'
        ),
        _react2.default.createElement(
          'form',
          {
            onSubmit: function onSubmit(ev) {
              ev.preventDefault();

              _this2.props.dispatch(_actions.Actions.SIGNUP({
                name: _this2.state.name,
                email: _this2.state.email,
                password: _this2.state.password
              }));
            }
          },
          _react2.default.createElement(_TextField2.default, {
            onChange: function onChange(ev) {
              return _this2.setState({ name: ev.target.value });
            },
            style: { display: 'block', width: '100%' },
            hintText: 'Name'
          }),
          _react2.default.createElement(_TextField2.default, {
            onChange: function onChange(ev) {
              return _this2.setState({ email: ev.target.value });
            },
            style: { display: 'block', width: '100%' },
            type: 'email',
            hintText: 'E-mail'
          }),
          _react2.default.createElement(_TextField2.default, {
            onChange: function onChange(ev) {
              return _this2.setState({ password: ev.target.value });
            },
            style: { display: 'block', width: '100%' },
            type: 'password',
            hintText: 'Password'
          }),
          _react2.default.createElement(_materialUi.RaisedButton, {
            style: { display: 'block' },
            type: 'submit',
            label: 'Submit',
            primary: true
          })
        )
      );
    }
  }]);

  return Signup;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)()(Signup);