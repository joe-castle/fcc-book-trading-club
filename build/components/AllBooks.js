'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _TradeControls = require('./TradeControls');

var _TradeControls2 = _interopRequireDefault(_TradeControls);

var _Book = require('./Book');

var _Book2 = _interopRequireDefault(_Book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AllBooks(_ref) {
  var books = _ref.books,
      user = _ref.user,
      dispatch = _ref.dispatch;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_TradeControls2.default, null),
    _react2.default.createElement(
      'h1',
      null,
      'All Books'
    ),
    _react2.default.createElement(
      'div',
      null,
      books.map(function (book) {
        return _react2.default.createElement(_Book2.default, {
          book: book,
          owner: book.owner === user.id,
          request: function request() {
            return dispatch(_actions.Actions.PUT_TRADE_REQUEST(book.id));
          }
        });
      })
    )
  );
}

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    books: state.books,
    user: state.user
  };
})(AllBooks);