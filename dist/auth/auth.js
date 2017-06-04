'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = signToken;
exports.decodeToken = decodeToken;
exports.authorizeUser = authorizeUser;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkToken = (0, _expressJwt2.default)({ secret: _config2.default.secret });

function signToken(id) {
  return _jsonwebtoken2.default.sign({ _id: id }, _config2.default.secret, { expiresIn: _config2.default.expireTime });
}

function decodeToken() {
  return function (req, res, next) {
    if (req.query && req.query.hasOwnProperty('id_token')) {
      req.headers.authorization = 'Bearer ' + req.query.id_token;
    }

    checkToken(req, res, next);
  };
}

function authorizeUser() {
  return function (req, res, next) {
    if (req.user._id !== String(req.playlist.owner)) {
      res.sendStatus(401);
    } else {
      next();
    }
  };
}
//# sourceMappingURL=auth.js.map