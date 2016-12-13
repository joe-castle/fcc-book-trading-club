'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constants = exports.Actions = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reduxEasyActions = require('redux-easy-actions');

var _reduxEasyActions2 = _interopRequireDefault(_reduxEasyActions);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _EasyActions = (0, _reduxEasyActions2.default)({
  ADD_BOOK: function ADD_BOOK(type, payload) {
    return { type: type, payload: payload };
  },
  ADD_OWN_BOOK: function ADD_OWN_BOOK(type, bookId) {
    return { type: type, bookId: bookId };
  },
  REMOVE_BOOK: function REMOVE_BOOK(type, bookId) {
    return { type: type, bookId: bookId };
  },
  REMOVE_OWN_BOOK: function REMOVE_OWN_BOOK(type, bookId) {
    return { type: type, bookId: bookId };
  },
  TRADE_REQUEST: function TRADE_REQUEST(type, bookId, userId) {
    return { type: type, bookId: bookId, userId: userId };
  },
  TRADE_CANCEL: function TRADE_CANCEL(type, bookId, userId) {
    return { type: type, bookId: bookId, userId: userId };
  },
  TRADE_ACCEPT: function TRADE_ACCEPT(type, bookId, userId) {
    return { type: type, bookId: bookId, userId: userId };
  },
  TRADE_REJECT: function TRADE_REJECT(type, bookId, userId) {
    return { type: type, bookId: bookId, userId: userId };
  },
  ADD_USER: function ADD_USER(type, payload) {
    return { type: type, payload: payload };
  },
  UPDATE_USER: function UPDATE_USER(type, payload) {
    return { type: type, payload: payload };
  },
  REMOVE_USER: function REMOVE_USER(type) {
    return { type: type };
  }
}),
    Actions = _EasyActions.Actions,
    Constants = _EasyActions.Constants;

Actions.POST_BOOK = function (title) {
  return function (dispatch) {
    _axios2.default.post('/api/books/' + title).then(function (_ref) {
      var data = _ref.data;

      dispatch([Actions.ADD_BOOK(data), Actions.ADD_OWN_BOOK(data.id)]);
    }).catch(console.log);
  };
};

Actions.DELETE_BOOK = function (bookId) {
  return function (dispatch) {
    _axios2.default.delete('/api/books/' + bookId).then(function () {
      dispatch([Actions.REMOVE_OWN_BOOK(bookId), Actions.REMOVE_BOOK(bookId)]);
    }).catch(console.log);
  };
};

var PUT_BOOK = function PUT_BOOK(trade) {
  return function (bookId) {
    return function (dispatch, getState) {
      var userId = getState().user.id;

      _axios2.default.put('/api/books/' + bookId + '?trade=' + trade).then(function () {
        dispatch(Actions['TRADE_' + trade.toUpperCase()](bookId, userId));
      }).catch(console.log);
    };
  };
};

Actions.PUT_TRADE_REQUEST = PUT_BOOK('request');
Actions.PUT_TRADE_CANCEL = PUT_BOOK('cancel');
Actions.PUT_TRADE_ACCEPT = PUT_BOOK('accept');
Actions.PUT_TRADE_REJECT = PUT_BOOK('reject');

Actions.SIGNUP = function (details) {
  return function (dispatch) {
    _axios2.default.post('/signup', details).then(function (_ref2) {
      var data = _ref2.data;

      dispatch([Actions.ADD_USER(data), (0, _reactRouterRedux.push)('/mybooks')]);
    }).catch(console.log);
  };
};

Actions.LOGIN = function (details) {
  return function (dispatch) {
    _axios2.default.post('/login', details).then(function (_ref3) {
      var data = _ref3.data;

      dispatch([Actions.ADD_USER(data), (0, _reactRouterRedux.push)('/mybooks')]);
    }).catch(console.log);
  };
};

Actions.LOGOUT = function () {
  return function (dispatch) {
    _axios2.default.post('/logout').then(function () {
      dispatch([(0, _reactRouterRedux.push)('/login'), Actions.REMOVE_USER()]);
    }).catch(console.log);
  };
};

Actions.PUT_USER = function (details) {
  return function (dispatch) {
    _axios2.default.put('/api/users', details).then(function (_ref4) {
      var data = _ref4.data;

      dispatch(Actions.UPDATE_USER(data));
    }).catch(console.log);
  };
};

exports.Actions = Actions;
exports.Constants = Constants;