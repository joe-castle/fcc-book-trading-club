"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Home() {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h1",
      null,
      "Book Traders"
    ),
    _react2.default.createElement(
      "p",
      null,
      "Projected created as part of the freecodecamp curriculum. Project details ",
      _react2.default.createElement(
        "a",
        { href: "https://www.freecodecamp.com/challenges/manage-a-book-trading-club", target: "_blank" },
        "here"
      ),
      "."
    ),
    _react2.default.createElement(
      "p",
      null,
      "Built using React, Redux, React-Router, Material-UI, Express, Passport and Redis."
    ),
    _react2.default.createElement(
      "p",
      null,
      "Signup above to get started."
    )
  );
}

exports.default = Home;