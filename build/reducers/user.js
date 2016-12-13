'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = users;

var _actions = require('../actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      bookId = _ref.bookId,
      payload = _ref.payload;

  switch (type) {
    case _actions.Constants.ADD_USER:
    case _actions.Constants.UPDATE_USER:
      return payload;

    case _actions.Constants.REMOVE_USER:
      return {};

    case _actions.Constants.ADD_OWN_BOOK:
      return _extends({}, state, {
        ownBooks: [].concat(_toConsumableArray(state.ownBooks), [bookId])
      });

    case _actions.Constants.REMOVE_OWN_BOOK:
      return _extends({}, state, {
        ownBooks: state.ownBooks.filter(function (id) {
          return id !== bookId;
        })
      });

    case _actions.Constants.TRADE_REQUEST:
      return _extends({}, state, {
        outboundTradeRequests: [].concat(_toConsumableArray(state.outboundTradeRequests), [bookId])
      });

    case _actions.Constants.TRADE_CANCEL:
      return _extends({}, state, {
        outboundTradeRequests: state.outboundTradeRequests.filter(function (id) {
          return id !== bookId;
        })
      });

    case _actions.Constants.TRADE_ACCEPT:
      return _extends({}, state, {
        ownBooks: state.ownBooks.filter(function (id) {
          return id !== bookId;
        }),
        inboundTradeRequests: state.inboundTradeRequests.filter(function (id) {
          return id !== bookId;
        })
      });

    case _actions.Constants.TRADE_REJECT:
      return _extends({}, state, {
        inboundTradeRequests: state.inboundTradeRequests.filter(function (id) {
          return id !== bookId;
        })
      });

    default:
      return state;
  }
}