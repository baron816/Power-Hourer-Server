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

export function usersCreate(req, res, next) {
  const newUser = new User(req.body);

  newUser.save(function(err, user) {
    if (err) {
      next(err);
    }

    res.json({_id: user._id});
  });
}

export function userShow(req, res) {
  const user = req.user;
  res.json(user || {});
};

export function userPlaylists(req, res) {
  const {_id} = req.user;

  Playlist
  .find({owner: _id})
  .then(function(playlists) {
    res.json(playlists || []);
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
      res.status(404).json({err: "Not found"})
    }
  }, function(err) {
    next(err);
  });
}
