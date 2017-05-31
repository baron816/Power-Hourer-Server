'use strict';

var _chai = require('chai');

var _userModel = require('./userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('creating a user', function () {
  it('saves a user', function (done) {
    var user = new _userModel2.default({
      googleId: 'vaouneo8297v6a',
      username: 'baron'
    });

    user.save(function (err, usr) {
      console.log(usr);
    });
    // .then((usr) => {
    //   expect(usr.isNew).to.be.false;
    // });
    done();
  });
});
//# sourceMappingURL=userModel.test.js.map