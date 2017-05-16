import {expect} from 'chai';
import Playlist from './playlistModel';
import User from '../users/userModel';

describe('creating a playlist', () => {
  it('creates a playlist with a user', () => {
    const user = new User({
      _id: 'vaouneo8297v6a',
      username: 'baron',
    })

    user.save().then((usr) => console.log(usr))
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
