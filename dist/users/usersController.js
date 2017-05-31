'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userPlaylists = userPlaylists;
exports.findOrCreateUser = findOrCreateUser;
exports.idParam = idParam;

var _userModel = require('./userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _playlistModel = require('../playlists/playlistModel');

var _playlistModel2 = _interopRequireDefault(_playlistModel);

var _googleAuthLibrary = require('google-auth-library');

var _googleAuthLibrary2 = _interopRequireDefault(_googleAuthLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userPlaylists(req, res) {
  var _id = req.user._id;


  _playlistModel2.default.find({ owner: _id }).then(function (playlistsData) {
    var playlists = playlistsData.map(function (_ref) {
      var _id = _ref._id,
          owner = _ref.owner,
          playlistId = _ref.playlistId,
          title = _ref.title,
          thumbnail = _ref.thumbnail,
          exposed = _ref.exposed;
      return { _id: _id, owner: owner, playlistId: playlistId, title: title, thumbnail: thumbnail, exposed: exposed };
    });
    res.json({ _id: _id, playlists: playlists } || {});
  });
}

function findOrCreateUser(req, res, next) {
  var auth = new _googleAuthLibrary2.default();
  var client = new auth.OAuth2(process.env.CLIENT_ID);

  var idToken = req.headers.authorization;


  client.verifyIdToken(idToken, process.env.CLIENT_ID, function (err, login) {
    if (err) {
      next(err);
    } else {
      var payload = login.getPayload();
      var googleId = payload['sub'];

      _userModel2.default.findOne({ googleId: googleId }).then(function (user) {
        if (user) {
          _playlistModel2.default.find({ owner: user._id }).then(function (playlistsData) {
            var playlists = playlistsData.map(function (_ref2) {
              var _id = _ref2._id,
                  owner = _ref2.owner,
                  playlistId = _ref2.playlistId,
                  title = _ref2.title,
                  thumbnail = _ref2.thumbnail,
                  exposed = _ref2.exposed;
              return { _id: _id, owner: owner, playlistId: playlistId, title: title, thumbnail: thumbnail, exposed: exposed };
            });
            res.json({ _id: user._id, playlists: playlists } || {});
          });
        } else {
          var newUser = new _userModel2.default({ googleId: googleId });

          newUser.save(function (err, usr) {
            if (err) {
              next(err);
            } else {
              res.json({ _id: usr._id, playlists: [] });
            }
          });
        }
      });
    }
  });
}

function idParam(req, res, next, id) {
  _userModel2.default.findById(id).then(function (user) {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ err: 'Not found' });
    }
  }, function (err) {
    next(err);
  });
}
//# sourceMappingURL=usersController.js.map