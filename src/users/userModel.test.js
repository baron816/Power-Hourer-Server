import {expect} from 'chai';
import User from './userModel';

describe('creating a user', () => {
  it('saves a user', (done) => {
    const user = new User({
      googleId: 'vaouneo8297v6a',
      username: 'baron',
    });

    user.save(function (err, usr) {
      console.log(usr);
    })
    // .then((usr) => {
    //   expect(usr.isNew).to.be.false;
    // });
    done();
  });
});
