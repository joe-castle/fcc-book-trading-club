'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = books;

var _actions = require('../actions');

function books() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { open: false };
  var _ref = arguments[1];
  var type = _ref.type,
      message = _ref.message;

  switch (type) {
    case _actions.Constants.OPEN_ERROR:
      return {
        open: true,
        message: message
      };

    case _actions.Constants.CLOSE_ERROR:
      return {
        open: false
      };

    default:
      return state;
  }
}