'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _materialUi = require('material-ui');

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _done = require('material-ui/svg-icons/action/done');

var _done2 = _interopRequireDefault(_done);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TradeControls = function (_React$Component) {
  _inherits(TradeControls, _React$Component);

  function TradeControls() {
    _classCallCheck(this, TradeControls);

    var _this = _possibleConstructorReturn(this, (TradeControls.__proto__ || Object.getPrototypeOf(TradeControls)).call(this));

    _this.state = {
      inboundTradesOpen: false,
      outboundTradesOpen: false
    };
    return _this;
  }

  _createClass(TradeControls, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          user = _props.user,
          books = _props.books,
          dispatch = _props.dispatch;


      return _react2.default.createElement(
        'div',
        { style: { margin: '25px 0' } },
        _react2.default.createElement(_materialUi.RaisedButton, {
          primary: true,
          style: { marginRight: '10px', marginBottom: '10px' },
          onTouchTap: function onTouchTap() {
            return _this2.setState({ outboundTradesOpen: !_this2.state.outboundTradesOpen });
          },
          label: 'Your trade requests (' + user.outboundTradeRequests.length + ') outstanding'
        }),
        _react2.default.createElement(_materialUi.RaisedButton, {
          secondary: true,
          onTouchTap: function onTouchTap() {
            return _this2.setState({ inboundTradesOpen: !_this2.state.inboundTradesOpen });
          },
          label: 'Trade requests for you (' + user.inboundTradeRequests.length + ') unnaproved'
        }),
        this.state.outboundTradesOpen && _react2.default.createElement(
          _materialUi.List,
          null,
          _react2.default.createElement(
            _materialUi.Subheader,
            null,
            'Outstanding Requests:'
          ),
          _react2.default.createElement(_materialUi.Divider, null),
          user.outboundTradeRequests.map(function (request) {
            var book = books.find(function (book) {
              return book.id === request;
            });

            return _react2.default.createElement(_materialUi.ListItem, {
              primaryText: book.title,
              rightIconButton: _react2.default.createElement(_clear2.default, {
                onTouchTap: function onTouchTap() {
                  return dispatch(_actions.Actions.PUT_TRADE_CANCEL(book.id));
                },
                style: { marginTop: '12px', color: 'red' }
              })
            });
          })
        ),
        this.state.inboundTradesOpen && _react2.default.createElement(
          _materialUi.List,
          null,
          _react2.default.createElement(
            _materialUi.Subheader,
            null,
            'Unapproved Requests:'
          ),
          _react2.default.createElement(_materialUi.Divider, null),
          user.inboundTradeRequests.map(function (request) {
            var book = books.find(function (book) {
              return book.id === request;
            });

            return _react2.default.createElement(_materialUi.ListItem, {
              primaryText: book.title,
              rightIconButton: _react2.default.createElement(
                'div',
                { style: { marginTop: '12px' } },
                _react2.default.createElement(_clear2.default, {
                  onTouchTap: function onTouchTap() {
                    return dispatch(_actions.Actions.PUT_TRADE_REJECT(book.id));
                  },
                  style: { marginRight: '10px', color: 'red' }
                }),
                _react2.default.createElement(_done2.default, {
                  onTouchTap: function onTouchTap() {
                    return dispatch(_actions.Actions.PUT_TRADE_ACCEPT(book.id));
                  },
                  style: { color: 'green' }
                })
              )
            });
          })
        )
      );
    }
  }]);

  return TradeControls;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    books: state.books,
    user: state.user
  };
})(TradeControls);