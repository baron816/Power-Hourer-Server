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

exports.default = {
  port: process.env.PORT || 8080
};


_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/power-hourer');

exports.mongoose = _mongoose2.default;
//# sourceMappingURL=config.js.map