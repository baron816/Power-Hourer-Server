import Playlist from './playlistModel';
import PlaylistItem from '../playlistItems/playlistItemsModel';

export function playlistsIndex(req, res, next) {
  Playlist.find({})
  .then(function(posts) {
    res.json(posts);
  }, function(err) {
    next(err);
  });
}

export function playlistsCreate(req, res, next) {
  const {owner, playlistItems, playlistId, thumbnail, title} = req.body;
  const newPlaylist = new Playlist({owner, playlistId, thumbnail, title});

  newPlaylist.save(function(err, playlist) {
    if (err) {
      next(err);
    }

    playlistItems.forEach((item) => {
      item.playlist = playlist._id;
      const newPlaylistItem = new PlaylistItem(item);
      newPlaylistItem.save();
    });

    res.json({playlist});
  });
}

export function playlistItems(req, res, next) {
  const {_id} = req.playlist;

  PlaylistItem
  .find({playlist: _id})
  .then(function(items) {
    res.json(items || []);
  });
}

export function playlistDelete(req, res, next) {
  const playlist = req.playlist;

  PlaylistItem
  .remove({playlist: playlist._id})
  .then(function() {
    return playlist.remove();
  })
  .then(function(removed) {
    res.json(removed);
  })
  .catch(function(err) {
    console.log('problem');
    next(err);
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
