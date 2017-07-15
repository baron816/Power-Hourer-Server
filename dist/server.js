'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _setupMongoose = require('./config/setup-mongoose');

var _setupMongoose2 = _interopRequireDefault(_setupMongoose);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _usersRouter = require('./users/usersRouter');

var _usersRouter2 = _interopRequireDefault(_usersRouter);

var _playlistsRouter = require('./playlists/playlistsRouter');

var _playlistsRouter2 = _interopRequireDefault(_playlistsRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var app, _ref2, cleanup;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = (0, _express2.default)();

            app.use((0, _cors2.default)());

            app.use((0, _morgan2.default)('combined'));
            app.use(_bodyParser2.default.json());

            _context.next = 6;
            return (0, _setupMongoose2.default)();

          case 6:
            _ref2 = _context.sent;
            cleanup = _ref2.cleanup;


            app.use('/users', _usersRouter2.default);
            app.use('/playlists', _playlistsRouter2.default);

            app.use(function (req, res) {
              res.status(404).json({ url: req.url });
            });

            app.use(function (err, req, res) {
              res.status(500).json({
                error: err
              });
            });

            return _context.abrupt('return', new Promise(function (resolve) {
              var server = app.listen(_config2.default.port, function () {
                console.log('Listening on port ' + _config2.default.port);
                server.on('close', function () {
                  cleanup();
                });
                resolve(server);
              });
            }));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function start() {
    return _ref.apply(this, arguments);
  }

  return start;
}();
//# sourceMappingURL=server.js.map