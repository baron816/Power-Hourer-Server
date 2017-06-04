import Playlist from './playlistModel';

export function playlistsIndex(req, res, next) {
  const {page} = req.query;

  Playlist
  .paginate({exposed: true}, {sort: '-playCount', limit: 25, page: page || 1})
  .then(function({docs, page, pages, total}) {
    const playlists = docs.map(({_id, owner, playlistId, thumbnail, title, playCount}) => ({_id, owner, playlistId, thumbnail, title, playCount}));
    res.json({playlists, page, pages, total});
  }, function(err) {
    next(err);
  });
}

export function playlistsCreate(req, res, next) {
  req.body.owner = req.user._id;

  const newPlaylist = new Playlist(req.body);

  newPlaylist.save(function(err, playlist) {
    if (err) {
      next(err);
    }

    res.json({playlist});
  });
}

export function playlistItems(req, res) {
  const {playlistItems} = req.playlist;

  res.json(playlistItems || []);
}

export function playlistDelete(req, res, next) {
  const playlist = req.playlist;

  playlist.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
}

export function playlistIncrementPlayCount(req, res, next) {
  const playlist = req.playlist;

  playlist.playCount += 1;

  playlist.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(playlist._id);
    }
  });
}

export function playlistItemUpdate(req, res, next) {
  const playlist = req.playlist;
  const item = req.playlistItem;
  const update = req.body;

  req.playlistItem = Object.assign(item, update);

  playlist.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(req.playlistItem);
    }
  });
}

export function moveItemUpdate(req, res) {
  const playlist = req.playlist;

  const {oldIndex, newIndex} = req.body;

  playlist.movePlaylistItem(oldIndex, newIndex);

  res.json(playlist._id || {});
}

export function playlistUpdate(req, res, next) {
  const playlist = req.playlist;
  const update = req.body;

  req.playlist = Object.assign(playlist, update);

  req.playlist.save(function (err, playlist) {
    if (err) {
      next(err);
    } else {
      const { _id, exposed, thumbnail, playlistId, owner, title } = playlist;
      res.json({ _id, exposed, thumbnail, playlistId, owner, title } || {});
    }
  });
}

export function idParam(req, res, next, id) {
  Playlist
  .findById(id)
  .then(function(playlist) {
    if (playlist) {
      req.playlist = playlist;
      next();
    } else {
      next(new Error('Not found'));
    }
  }, function(err) {
    next(err);
  });
}

export function playlistItemParam(req, res, next, itemId) {
  const playlist = req.playlist;
  const playlistItem = playlist.playlistItems.find((item) => String(item._id) === itemId);

  req.playlistItem = playlistItem;
  next();
}
