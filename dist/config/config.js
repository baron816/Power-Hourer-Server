'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

exports.default = {
  port: process.env.PORT || 8000,
  expireTime: 24 * 60 * 90,
  secret: process.env.JWT_SECRET
};
//# sourceMappingURL=config.js.map