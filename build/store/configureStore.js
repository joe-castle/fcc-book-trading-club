'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrayMiddleWare = function arrayMiddleWare(_ref) {
  var dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (Array.isArray(action)) return action.forEach(function (item) {
        return dispatch(item);
      });

      return next(action);
    };
  };
};

exports.default = function (initialState) {
  var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, arrayMiddleWare, (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory)), window.devToolsExtension && module.hot ? window.devToolsExtension() : function (f) {
    return f;
  }));

  if (module.hot) {
    module.hot.accept('../reducers', function () {
      return (
        /* eslint-disable global-require */
        store.replaceReducer(require('../reducers').default)
      );
    });
  }

  return store;
};