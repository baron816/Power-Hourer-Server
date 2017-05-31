'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config/config');

var UserSchema = new _config.mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

exports.default = _config.mongoose.model('users', UserSchema);
//# sourceMappingURL=userModel.js.map