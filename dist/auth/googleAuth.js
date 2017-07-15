'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = googleAuth;

var _googleAuthLibrary = require('google-auth-library');

var _googleAuthLibrary2 = _interopRequireDefault(_googleAuthLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function googleAuth(next, idToken, fn) {
  var auth = new _googleAuthLibrary2.default();
  var client = new auth.OAuth2(process.env.CLIENT_ID);

  client.verifyIdToken(idToken, process.env.CLIENT_ID, function (err, login) {
    if (err) {
      next(err);
    } else {
      var payload = login.getPayload();
      var googleId = payload['sub'];

      fn(googleId);
    }
  });
}
//# sourceMappingURL=googleAuth.js.map