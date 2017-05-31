'use strict';

var _chai = require('chai');

var _playlistModel = require('./playlistModel');

var _playlistModel2 = _interopRequireDefault(_playlistModel);

var _userModel = require('../users/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('creating a playlist', function () {
  it('creates a playlist with a user', function () {
    var user = new _userModel2.default({
      _id: 'vaouneo8297v6a',
      username: 'baron'
    });

    user.save().then(function (usr) {
      return console.log(usr);
    });
    // .then((usr) => {
    //   console.log(usr);
    //   const playlist = {
    //     owner: usr._id,
    //     playlistId: 'anveoan982y2',
    //     title: 'jockjams',
    //     thumbnail: '3avno3u2n1',
    //     playlistItems: [
    //       {
    //         startTime: 35,
    //         videoId: '0oa4cwafaw329',
    //         title: '1ase2c',
    //         thumbnail: 'oqjlelen',
    //       },
    //     ],
    //   };
    //   console.log(playlist);
    //   return Playlist.create(playlist);
    // })
    // .then((pl) => {
    //   console.log(pl);
    //   expect(pl).to.be.an.instanceof(Playlist);
    //   expect(pl).to.not.have.property('owner');
    // });
  });
});
//# sourceMappingURL=playlistModel.test.js.map