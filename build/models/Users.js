'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shortid = require('shortid');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _actions = require('../client/actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = (0, _actions2.default)('users');

var Users = function () {
  _createClass(Users, null, [{
    key: 'get',
    value: function get(id) {
      return id ? users.get(id).then(function (user) {
        return user && new Users(user);
      }) : users.getAll();
    }
  }, {
    key: 'findByEmail',
    value: function findByEmail(email) {
      return users.getAll().then(function (users) {
        if (!users) return false;

        var user = users.find(function (user) {
          return user.email === email;
        });

        if (!user) return false;

        return new Users(user);
      });
    }
  }]);

  function Users(_ref) {
    var _ref$id = _ref.id,
        id = _ref$id === undefined ? (0, _shortid.generate)() : _ref$id,
        name = _ref.name,
        email = _ref.email,
        password = _ref.password,
        _ref$city = _ref.city,
        city = _ref$city === undefined ? '' : _ref$city,
        _ref$state = _ref.state,
        state = _ref$state === undefined ? '' : _ref$state,
        _ref$ownBooks = _ref.ownBooks,
        ownBooks = _ref$ownBooks === undefined ? [] : _ref$ownBooks,
        _ref$outboundTradeReq = _ref.outboundTradeRequests,
        outboundTradeRequests = _ref$outboundTradeReq === undefined ? [] : _ref$outboundTradeReq,
        _ref$inboundTradeRequ = _ref.inboundTradeRequests,
        inboundTradeRequests = _ref$inboundTradeRequ === undefined ? [] : _ref$inboundTradeRequ;

    _classCallCheck(this, Users);

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
    this.ownBooks = ownBooks;
    this.outboundTradeRequests = outboundTradeRequests;
    this.inboundTradeRequests = inboundTradeRequests;
  }

  _createClass(Users, [{
    key: 'encryptPassword',
    value: function encryptPassword(password) {
      this.password = _bcrypt2.default.hashSync(password || this.password, 10);

      return this;
    }
  }, {
    key: 'save',
    value: function save() {
      return users.set(this.id, this);
    }
  }, {
    key: 'update',
    value: function update(_ref2) {
      var password = _ref2.password,
          city = _ref2.city,
          state = _ref2.state,
          ownBooks = _ref2.ownBooks,
          outboundTradeRequests = _ref2.outboundTradeRequests,
          inboundTradeRequests = _ref2.inboundTradeRequests;

      this.city = city || this.city;
      this.state = state || this.state;
      this.ownBooks = ownBooks || this.ownBooks;
      this.outboundTradeRequests = outboundTradeRequests || this.outboundTradeRequests;
      this.inboundTradeRequests = inboundTradeRequests || this.inboundTradeRequests;

      if (password) this.encryptPassword(password);

      return this;
    }
  }, {
    key: 'exclude',
    value: function exclude(toExclude) {
      var _this = this;

      var exclude = toExclude.split(' ');

      return Object.keys(this).reduce(function (prev, curr) {
        if (exclude.includes(curr)) {
          return prev;
        }

        return _extends({}, prev, _defineProperty({}, curr, _this[curr]));
      }, {});
    }
  }]);

  return Users;
}();

exports.default = Users;