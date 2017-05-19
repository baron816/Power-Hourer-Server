import User from './userModel';
import Playlist from '../playlists/playlistModel';

export function usersIndex(req, res, next) {
  User.find({})
  .then(function(users) {
    res.json(users);
  }, function(err) {
    next(err);
  });
}

export function userShow(req, res) {
  const user = req.user;
  res.json(user || {});
}

export function userPlaylists(req, res) {
  const {_id} = req.user;

  Playlist
  .find({owner: _id})
  .then(function(playlistsData) {
    const playlists = playlistsData.map(({_id, owner, playlistId, title, thumbnail, exposed}) => ({_id, owner, playlistId, title, thumbnail, exposed}));
    res.json({_id, playlists} || {});
  });
}

export function findOrCreateUser(req, res, next) {
  const {googleId} = req.body;

  User.findOne({googleId})
  .then(function (user) {
    if (user) {
      Playlist.find({owner: user._id})
      .then(function(playlistsData) {
        const playlists = playlistsData.map(({_id, owner, playlistId, title, thumbnail, exposed}) => ({_id, owner, playlistId, title, thumbnail, exposed}));
        res.json({_id: user._id, playlists} || {});
      });
    } else {
      const newUser = new User({googleId});

      newUser.save(function (err, usr) {
        if (err) {
          next(err);
        } else {
          res.json({_id: usr._id, playlists: []});
        }
      });
    }
  });
}

export function idParam(req, res, next, id) {
  User
  .findOne({googleId: id})
  .then(function(user) {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({err: 'Not found'});
    }
  }, function(err) {
    next(err);
  });
}
