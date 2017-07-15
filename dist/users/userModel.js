'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
}); // import {mongoose} from '../config/config';
exports.default = _mongoose2.default.model('users', UserSchema);
//# sourceMappingURL=userModel.js.map