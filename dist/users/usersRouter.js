'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _usersController = require('./usersController');

var _auth = require('../auth/auth');

var usersRouter = new _express.Router();

// usersRouter.param('id', idParam);

usersRouter.route('/').post(_usersController.findOrCreateUser);

usersRouter.route('/playlists').get((0, _auth.decodeToken)(), _usersController.userPlaylists);

exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map