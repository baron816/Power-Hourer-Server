'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

exports.default = {
  port: process.env.PORT || 8000,
  expireTime: 24 * 60 * 90,
  secret: process.env.JWT_SECRET
};


_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(process.env.MONGODB_URI);

exports.mongoose = _mongoose2.default;
//# sourceMappingURL=config.js.map