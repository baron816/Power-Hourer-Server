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
exports.playlistItemDelete = playlistItemDelete;
exports.playlistItemAdd = playlistItemAdd;
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

    var playlists = docs.map(function (playlist) {
      return playlist.excludeKeys('playlistItems');
    });
    res.json({ playlists: playlists, page: page, pages: pages, total: total });
  }, function (err) {
    next(err);
  });
}

function playlistsCreate(req, res, next) {
  req.body.owner = req.user._id;

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

function playlistItemDelete(req, res, next) {
  var playlist = req.playlist;
  var item = req.playlistItem;

  _playlistModel2.default.update({ _id: playlist._id }, { $pull: { playlistItems: { _id: item._id } } }, function (err) {
    if (err) {
      next();
    } else {
      res.json(item._id);
    }
  });
}

function playlistItemAdd(req, res, next) {
  var playlist = req.playlist;
  var item = req.body;

  _playlistModel2.default.update({ _id: playlist._id }, { $push: { playlistItems: item } }, function (err) {
    if (err) {
      next();
    } else {
      res.json(item);
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
      res.json(playlist.excludeKeys('playlistItems') || {});
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

  if (playlistItem) {
    req.playlistItem = playlistItem;
  }
  next();
}
//# sourceMappingURL=playlistsController.js.map