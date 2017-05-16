import Playlist from './playlistModel';

export function playlistsIndex(req, res, next) {
  Playlist.find({})
  .then(function(posts) {
    res.json(posts);
  }, function(err) {
    next(err);
  });
}

export function playlistsCreate(req, res, next) {
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

export function playlistItemShow(req, res) {
  const playlistItem = req.playlistItem;

  res.json(playlistItem || {});
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

export function playlistItemUpdate(req, res, next) {
  const playlist = req.playlist;
  var item = req.playlistItem;
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
