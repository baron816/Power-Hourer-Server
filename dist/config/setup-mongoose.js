'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var setupMongoose = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var cleanup, reset;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reset = function reset() {
              _mongoose2.default.connection.db.dropDatabase();
            };

            cleanup = function cleanup() {
              _mongoose2.default.connection.close();
            };

            if ('MONGODB_DEBUG' in process.env) {
              _mongoose2.default.set('debug', true);
            }

            if (!process.env.MONGODB_URI) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return connect(process.env.MONGODB_URI);

          case 6:
            _context.next = 10;
            break;

          case 8:
            _context.next = 10;
            return connect('mongodb://localhost/power-hourer-test');

          case 10:
            return _context.abrupt('return', {
              cleanup: cleanup,
              reset: reset
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function setupMongoose() {
    return _ref.apply(this, arguments);
  };
}();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_mongoose2.default.Promise = Promise;

function connect(uri) {
  return _mongoose2.default.connect(uri).catch(function (error) {
    console.error('There was a problem connecting mongoose to mongodb', 'Do you have mongodb running?');
    return Promise.reject(error);
  });
}

exports.default = setupMongoose;
//# sourceMappingURL=setup-mongoose.js.map