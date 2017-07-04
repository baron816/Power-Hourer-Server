import User from './userModel';
import Playlist from '../playlists/playlistModel';
import GoogleAuth from 'google-auth-library';
import { signToken } from '../auth/auth';
import googleAuth from '../auth/googleAuth';

export async function userPlaylists(req, res) {
  const {_id} = req.user;

  var playlistsData = await Playlist.find({owner: _id})
  const playlists = playlistsData.map(({_id, owner, playlistId, title, thumbnail, exposed}) => ({_id, owner, playlistId, title, thumbnail, exposed}));

  res.json({playlists} || {});
}

export async function findOrCreateUser(req, res, next) {
  const {authorization: idToken} = req.headers;

  googleAuth(next, idToken, async function (googleId) {
    var user = await User.findOne({googleId});

    if (user) {
      var playlistsData = await Playlist.find({owner: user._id})
      const playlists = playlistsData.map(playlist => playlist.excludeKeys('playlistItems'));

      const token = signToken(user._id);
      res.json({token, playlists} || {});
    } else {
      const newUser = new User({googleId});

      try {
        var usr = newUser.save();
        const token = signToken(usr._id);
        res.json({token, playlists: []})
      } catch (e) {
        next(err)
      }
    }
  })
}
