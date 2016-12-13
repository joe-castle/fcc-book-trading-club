'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);

// If there is no REDISTOGO_URL, defaults to localhost, port 6379.
var client = _redis2.default.createClient(process.env.REDISTOGO_URL);
client.on('error', function (err) {
  return console.log('Error: ' + err);
});

if (process.env.NODE_ENV === 'test') {
  client.select(1);
}

module.exports = client;