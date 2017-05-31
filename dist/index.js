'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.listen(_config2.default.port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port ', _config2.default.port);
  }
});
//# sourceMappingURL=index.js.map