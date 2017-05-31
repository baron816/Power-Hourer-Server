'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playlistsIndex = playlistsIndex;
exports.playlistsCreate = playlistsCreate;
exports.playlistItems = playlistItems;
exports.playlistDelete = playlistDelete;
exports.playlistIncrementPlayCount = playlistIncrementPlayCount;
exports.playlistItemUpdate = playlistItemUpdate;
exports.moveItemUpdate = moveItemUpdate;
exports.playlistUpdate = playlistUpdate;
exports.idParam = idParam;
exports.playlistItemParam = playlistItemParam;

var _playlistModel = require('./playlistModel');

var _playlistModel2 = _interopRequireDefault(_playlistModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function playlistsIndex(req, res, next) {
  var page = req.query.page;


  _playlistModel2.default.paginate({ exposed: true }, { sort: '-playCount', limit: 25, page: page || 1 }).then(function (_ref) {
    var docs = _ref.docs,
        page = _ref.page,
        pages = _ref.pages,
        total = _ref.total;

    var playlists = docs.map(function (_ref2) {
      var _id = _ref2._id,
          owner = _ref2.owner,
          playlistId = _ref2.playlistId,
          thumbnail = _ref2.thumbnail,
          title = _ref2.title,
          playCount = _ref2.playCount;
      return { _id: _id, owner: owner, playlistId: playlistId, thumbnail: thumbnail, title: title, playCount: playCount };
    });
    res.json({ playlists: playlists, page: page, pages: pages, total: total });
  }, function (err) {
    next(err);
  });
}

function playlistsCreate(req, res, next) {
  var newPlaylist = new _playlistModel2.default(req.body);

  newPlaylist.save(function (err, playlist) {
    if (err) {
      next(err);
    }

    res.json({ playlist: playlist });
  });
}

function playlistItems(req, res) {
  var playlistItems = req.playlist.playlistItems;


  res.json(playlistItems || []);
}

function playlistDelete(req, res, next) {
  var playlist = req.playlist;

  playlist.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
}

function playlistIncrementPlayCount(req, res, next) {
  var playlist = req.playlist;

  playlist.playCount += 1;

  playlist.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(playlist._id);
    }
  });
}

function playlistItemUpdate(req, res, next) {
  var playlist = req.playlist;
  var item = req.playlistItem;
  var update = req.body;

  req.playlistItem = Object.assign(item, update);

  playlist.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(req.playlistItem);
    }
  });
}

function moveItemUpdate(req, res) {
  var playlist = req.playlist;
  var _req$body = req.body,
      oldIndex = _req$body.oldIndex,
      newIndex = _req$body.newIndex;


  playlist.movePlaylistItem(oldIndex, newIndex);

  res.json(playlist._id || {});
}

function playlistUpdate(req, res, next) {
  var playlist = req.playlist;
  var update = req.body;

  req.playlist = Object.assign(playlist, update);

  req.playlist.save(function (err, playlist) {
    if (err) {
      next(err);
    } else {
      var _id = playlist._id,
          exposed = playlist.exposed,
          thumbnail = playlist.thumbnail,
          playlistId = playlist.playlistId,
          owner = playlist.owner,
          title = playlist.title;

      res.json({ _id: _id, exposed: exposed, thumbnail: thumbnail, playlistId: playlistId, owner: owner, title: title } || {});
    }
  });
}

function idParam(req, res, next, id) {
  _playlistModel2.default.findById(id).then(function (playlist) {
    if (playlist) {
      req.playlist = playlist;
      next();
    } else {
      next(new Error('Not found'));
    }
  }, function (err) {
    next(err);
  });
}

function playlistItemParam(req, res, next, itemId) {
  var playlist = req.playlist;
  var playlistItem = playlist.playlistItems.find(function (item) {
    return String(item._id) === itemId;
  });

  req.playlistItem = playlistItem;
  next();
}
//# sourceMappingURL=playlistsController.js.map