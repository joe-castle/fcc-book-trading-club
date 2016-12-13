'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Book(_ref) {
  var book = _ref.book,
      owner = _ref.owner,
      request = _ref.request,
      remove = _ref.remove;

  return _react2.default.createElement(
    _materialUi.Card,
    {
      key: book.id,
      style: {
        display: 'inline-block',
        margin: '5px',
        width: '200px'
      }
    },
    _react2.default.createElement(
      _materialUi.CardMedia,
      null,
      _react2.default.createElement('img', { src: book.imgUrl, alt: book.title + ' book cover' })
    ),
    _react2.default.createElement(
      _materialUi.CardActions,
      null,
      _react2.default.createElement(_materialUi.RaisedButton, {
        onTouchTap: request,
        label: 'Request Trade',
        primary: !book.requestedForTradeBy,
        disabled: !!book.requestedForTradeBy || owner
      }),
      owner && _react2.default.createElement(_materialUi.RaisedButton, {
        style: { marginTop: '5px' },
        onTouchTap: remove,
        label: 'Remove Book',
        secondary: true
      })
    )
  );
}

exports.default = Book;