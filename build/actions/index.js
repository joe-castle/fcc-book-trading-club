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
  },
  OPEN_ERROR: function OPEN_ERROR(type, message) {
    return { type: type, message: message };
  },
  CLOSE_ERROR: function CLOSE_ERROR(type, message) {
    return { type: type, message: message };
  }
}),
    Actions = _EasyActions.Actions,
    Constants = _EasyActions.Constants;

Actions.POST_BOOK = function (title) {
  return function (dispatch) {
    _axios2.default.post('/api/books/' + title).then(function (_ref) {
      var data = _ref.data;

      dispatch([Actions.ADD_BOOK(data), Actions.ADD_OWN_BOOK(data.id)]);
    }).catch(function (_ref2) {
      var response = _ref2.response;
      return dispatch(Actions.OPEN_ERROR(response.data));
    });
  };
};

Actions.DELETE_BOOK = function (bookId) {
  return function (dispatch) {
    _axios2.default.delete('/api/books/' + bookId).then(function () {
      dispatch([Actions.REMOVE_OWN_BOOK(bookId), Actions.REMOVE_BOOK(bookId)]);
    }).catch(function (_ref3) {
      var response = _ref3.response;
      return dispatch(Actions.OPEN_ERROR(response.data));
    });
  };
};

var PUT_BOOK = function PUT_BOOK(trade) {
  return function (bookId) {
    return function (dispatch, getState) {
      var userId = getState().user.id;

      _axios2.default.put('/api/books/' + bookId + '?trade=' + trade).then(function () {
        dispatch(Actions['TRADE_' + trade.toUpperCase()](bookId, userId));
      }).catch(function (_ref4) {
        var response = _ref4.response;
        return dispatch(Actions.TOGGLE_ERROR(response.data));
      });
    };
  };
};

Actions.PUT_TRADE_REQUEST = PUT_BOOK('request');
Actions.PUT_TRADE_CANCEL = PUT_BOOK('cancel');
Actions.PUT_TRADE_ACCEPT = PUT_BOOK('accept');
Actions.PUT_TRADE_REJECT = PUT_BOOK('reject');

Actions.SIGNUP = function (details) {
  return function (dispatch) {
    _axios2.default.post('/signup', details).then(function (_ref5) {
      var data = _ref5.data;

      dispatch([Actions.ADD_USER(data), (0, _reactRouterRedux.push)('/mybooks')]);
    }).catch(function (_ref6) {
      var response = _ref6.response;
      return dispatch(Actions.OPEN_ERROR(response.data));
    });
  };
};

Actions.LOGIN = function (details) {
  return function (dispatch) {
    _axios2.default.post('/login', details).then(function (_ref7) {
      var data = _ref7.data;

      dispatch([Actions.ADD_USER(data), (0, _reactRouterRedux.push)('/mybooks')]);
    }).catch(function (_ref8) {
      var response = _ref8.response;
      return dispatch(Actions.OPEN_ERROR(response.data));
    });
  };
};

Actions.LOGOUT = function () {
  return function (dispatch) {
    _axios2.default.post('/logout').then(function () {
      dispatch([(0, _reactRouterRedux.push)('/login'), Actions.REMOVE_USER()]);
    }).catch(function (_ref9) {
      var response = _ref9.response;
      return dispatch(Actions.OPEN_ERROR(response.data));
    });
  };
};

Actions.PUT_USER = function (details) {
  return function (dispatch) {
    _axios2.default.put('/api/users', details).then(function (_ref10) {
      var data = _ref10.data;

      dispatch([Actions.UPDATE_USER(data), Actions.OPEN_ERROR('Deetails updated.')]);
    }).catch(function (_ref11) {
      var response = _ref11.response;
      return dispatch(Actions.OPEN_ERROR(response.data));
    });
  };
};

exports.Actions = Actions;
exports.Constants = Constants;