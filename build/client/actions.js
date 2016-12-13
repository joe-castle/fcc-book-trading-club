'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (hash) {
  return {
    exists: function exists(field) {
      return _index2.default.hexistsAsync(hash, field).catch(function (err) {
        return console.log(err);
      });
    },
    set: function set(field, value) {
      return _index2.default.hsetAsync(hash, field, JSON.stringify(value));
    },
    mset: function mset(data) {
      return _index2.default.hmset(hash, data.reduce(function (prev, curr) {
        return [].concat(_toConsumableArray(prev), [JSON.stringify(curr.id), JSON.stringify(curr)]);
      }, []));
    },
    get: function get(field) {
      return _index2.default.hgetAsync(hash, field).then(function (res) {
        return JSON.parse(res) || null;
      }).catch(function (err) {
        return console.log(err);
      });
    },
    getAll: function getAll() {
      return _index2.default.hgetallAsync(hash).then(function (data) {
        if (data) {
          return Object.keys(data).map(function (x) {
            return JSON.parse(data[x]);
          });
        }
        return;
      }).catch(function (err) {
        return console.log(err);
      });
    },
    del: function del(field) {
      return _index2.default.hdelAsync(hash, field);
    }
  };
};