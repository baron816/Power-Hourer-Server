'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOrCreateUser = exports.userPlaylists = undefined;

var userPlaylists = exports.userPlaylists = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _id, playlistsData, playlists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = req.user._id;
            _context.next = 3;
            return _playlistModel2.default.find({ owner: _id });

          case 3:
            playlistsData = _context.sent;
            playlists = playlistsData.map(function (_ref2) {
              var _id = _ref2._id,
                  owner = _ref2.owner,
                  playlistId = _ref2.playlistId,
                  title = _ref2.title,
                  thumbnail = _ref2.thumbnail,
                  exposed = _ref2.exposed;
              return { _id: _id, owner: owner, playlistId: playlistId, title: title, thumbnail: thumbnail, exposed: exposed };
            });


            res.json({ playlists: playlists } || {});

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function userPlaylists(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var findOrCreateUser = exports.findOrCreateUser = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
    var idToken;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            idToken = req.headers.authorization;


            (0, _googleAuth2.default)(next, idToken, function () {
              var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(googleId) {
                var user, playlistsData, playlists, token, newUser, usr, _token;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _userModel2.default.findOne({ googleId: googleId });

                      case 2:
                        user = _context2.sent;

                        if (!user) {
                          _context2.next = 12;
                          break;
                        }

                        _context2.next = 6;
                        return _playlistModel2.default.find({ owner: user._id });

                      case 6:
                        playlistsData = _context2.sent;
                        playlists = playlistsData.map(function (playlist) {
                          return playlist.excludeKeys('playlistItems');
                        });
                        token = (0, _auth.signToken)(user._id);

                        res.json({ token: token, playlists: playlists } || {});
                        _context2.next = 14;
                        break;

                      case 12:
                        newUser = new _userModel2.default({ googleId: googleId });


                        try {
                          usr = newUser.save();
                          _token = (0, _auth.signToken)(usr._id);

                          res.json({ token: _token, playlists: [] });
                        } catch (e) {
                          next(err);
                        }

                      case 14:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function findOrCreateUser(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _userModel = require('./userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _playlistModel = require('../playlists/playlistModel');

var _playlistModel2 = _interopRequireDefault(_playlistModel);

var _googleAuthLibrary = require('google-auth-library');

var _googleAuthLibrary2 = _interopRequireDefault(_googleAuthLibrary);

var _auth = require('../auth/auth');

var _googleAuth = require('../auth/googleAuth');

var _googleAuth2 = _interopRequireDefault(_googleAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=usersController.js.map