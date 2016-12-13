'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = books;

var _actions = require('../actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function books() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload,
      bookId = _ref.bookId,
      userId = _ref.userId;

  switch (type) {
    case _actions.Constants.ADD_BOOK:
      return [].concat(_toConsumableArray(state), [payload]);

    case _actions.Constants.REMOVE_BOOK:
      return state.filter(function (book) {
        return book.id !== bookId;
      });

    case _actions.Constants.TRADE_REQUEST:
      {
        var index = state.findIndex(function (book) {
          return book.id === bookId;
        });

        return [].concat(_toConsumableArray(state.slice(0, index)), [_extends({}, state[index], {
          requestedForTradeBy: userId
        })], _toConsumableArray(state.slice(index + 1)));
      }

    case _actions.Constants.TRADE_CANCEL:
    case _actions.Constants.TRADE_REJECT:
      {
        var _index = state.findIndex(function (book) {
          return book.id === bookId;
        });

        return [].concat(_toConsumableArray(state.slice(0, _index)), [_extends({}, state[_index], {
          requestedForTradeBy: ''
        })], _toConsumableArray(state.slice(_index + 1)));
      }

    case _actions.Constants.TRADE_ACCEPT:
      {
        var _index2 = state.findIndex(function (book) {
          return book.id === bookId;
        });

        return [].concat(_toConsumableArray(state.slice(0, _index2)), [_extends({}, state[_index2], {
          requestedForTradeBy: '',
          owner: state[_index2].requestedForTradeBy
        })], _toConsumableArray(state.slice(_index2 + 1)));
      }

    default:
      return state;
  }
}