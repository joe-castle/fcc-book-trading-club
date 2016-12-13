'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shortid = require('shortid');

var _actions = require('../client/actions');

var _actions2 = _interopRequireDefault(_actions);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var books = (0, _actions2.default)('books');

var Books = function () {
  _createClass(Books, null, [{
    key: 'get',
    value: function get(id) {
      return id ? books.get(id).then(function (book) {
        return book && new Books(book);
      }) : books.getAll();
    }
  }, {
    key: 'seed',
    value: function seed(data) {
      return books.mset(data);
    }
  }]);

  function Books(_ref) {
    var _ref$id = _ref.id,
        id = _ref$id === undefined ? (0, _shortid.generate)() : _ref$id,
        title = _ref.title,
        imgUrl = _ref.imgUrl,
        owner = _ref.owner,
        _ref$requestedForTrad = _ref.requestedForTradeBy,
        requestedForTradeBy = _ref$requestedForTrad === undefined ? '' : _ref$requestedForTrad;

    _classCallCheck(this, Books);

    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.owner = owner;
    this.requestedForTradeBy = requestedForTradeBy;
  }

  _createClass(Books, [{
    key: 'save',
    value: function save() {
      return books.set(this.id, this);
    }
  }, {
    key: 'update',
    value: function update(_ref2) {
      var _ref2$owner = _ref2.owner,
          owner = _ref2$owner === undefined ? this.owner : _ref2$owner,
          _ref2$requestedForTra = _ref2.requestedForTradeBy,
          requestedForTradeBy = _ref2$requestedForTra === undefined ? this.requestedForTradeBy : _ref2$requestedForTra;

      this.owner = owner;
      this.requestedForTradeBy = requestedForTradeBy;

      return this;
    }
  }, {
    key: 'delete',
    value: function _delete() {
      return books.del(this.id);
    }
  }, {
    key: 'trade',
    value: function trade(type, user) {
      var _this = this;

      _Users2.default.get(this.owner).then(function (owner) {
        _this.requestedForTradeBy = user.id;
        return _this.save();
      });
    }
  }]);

  return Books;
}();

exports.default = Books;