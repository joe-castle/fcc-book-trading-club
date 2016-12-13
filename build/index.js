'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactHotLoader = require('react-hot-loader');

var _materialUi = require('material-ui');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

require('./assets/stylus/main.styl');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)(window.INITIAL_STATE);

(0, _reactTapEventPlugin2.default)();
_reactDom2.default.render(_react2.default.createElement(
  _reactHotLoader.AppContainer,
  null,
  _react2.default.createElement(
    _materialUi.MuiThemeProvider,
    null,
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_Root2.default, { store: store })
    )
  )
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./Root', function () {
    /* eslint-disable global-require */
    var NewRoot = require('./Root').default;
    /* eslint-disable global-require */

    _reactDom2.default.render(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(
        _materialUi.MuiThemeProvider,
        null,
        _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(NewRoot, { store: store })
        )
      )
    ), document.getElementById('root'));
  });
}