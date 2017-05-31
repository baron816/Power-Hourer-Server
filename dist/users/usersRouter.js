'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _usersController = require('./usersController');

var usersRouter = new _express.Router();

usersRouter.param('id', _usersController.idParam);

usersRouter.route('/').post(_usersController.findOrCreateUser);

usersRouter.route('/:id/playlists').get(_usersController.userPlaylists);

exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map