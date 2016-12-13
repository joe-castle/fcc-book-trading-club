'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _materialUi = require('material-ui');

var _actions = require('../actions');

var _TradeControls = require('./TradeControls');

var _TradeControls2 = _interopRequireDefault(_TradeControls);

var _Book = require('./Book');

var _Book2 = _interopRequireDefault(_Book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyBooks = function (_React$Component) {
  _inherits(MyBooks, _React$Component);

  function MyBooks() {
    _classCallCheck(this, MyBooks);

    var _this = _possibleConstructorReturn(this, (MyBooks.__proto__ || Object.getPrototypeOf(MyBooks)).call(this));

    _this.state = {
      title: ''
    };
    return _this;
  }

  _createClass(MyBooks, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          books = _props.books,
          user = _props.user,
          dispatch = _props.dispatch;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TradeControls2.default, null),
        _react2.default.createElement(
          'h1',
          null,
          'My Books'
        ),
        _react2.default.createElement(
          'form',
          {
            style: { marginBottom: '20px' },
            onSubmit: function onSubmit(ev) {
              ev.preventDefault();

              dispatch(_actions.Actions.POST_BOOK(_this2.state.title));
            }
          },
          _react2.default.createElement(_materialUi.TextField, {
            onChange: function onChange(ev) {
              return _this2.setState({ title: ev.target.value });
            },
            hintText: 'Enter book title...'
          }),
          _react2.default.createElement(_materialUi.RaisedButton, {
            label: 'Add Book',
            type: 'submit',
            style: { marginLeft: '10px' },
            primary: true
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          user.ownBooks.map(function (bookId) {
            var book = books.find(function (book) {
              return book.id === bookId;
            });

            return _react2.default.createElement(_Book2.default, {
              book: book,
              owner: book.owner === user.id,
              remove: function remove() {
                return dispatch(_actions.Actions.DELETE_BOOK(bookId));
              }
            });
          })
        )
      );
    }
  }]);

  return MyBooks;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    books: state.books,
    user: state.user
  };
})(MyBooks);