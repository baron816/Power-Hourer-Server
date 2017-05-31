'use strict';

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'testing';

beforeEach(function (done) {
  function clearDB() {
    for (var i in _config.mongoose.connection.collections) {
      _config.mongoose.connection.collections[i].remove(function () {});
    }
    return done();
  }

  if (_config.mongoose.connection.readyState === 0) {
    _config.mongoose.connect(_config2.default.db.test, function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(function (done) {
  _config.mongoose.disconnect();
  return done();
});
//# sourceMappingURL=test.js.map