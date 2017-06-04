'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _playlistsController = require('./playlistsController');

var _auth = require('../auth/auth');

var playlistsRouter = new _express.Router();

playlistsRouter.param('id', _playlistsController.idParam);
playlistsRouter.param('itemId', _playlistsController.playlistItemParam);

var authorize = [(0, _auth.decodeToken)(), (0, _auth.authorizeUser)()];

playlistsRouter.route('/').get(_playlistsController.playlistsIndex).post((0, _auth.decodeToken)(), _playlistsController.playlistsCreate);

playlistsRouter.route('/:id/playlistItems').get(_playlistsController.playlistItems);

playlistsRouter.route('/:id/incrementPlayCount').put(_playlistsController.playlistIncrementPlayCount);

playlistsRouter.route('/:id/').put(authorize, _playlistsController.playlistUpdate).delete(authorize, _playlistsController.playlistDelete);

playlistsRouter.route('/:id/moveItem').put(authorize, _playlistsController.moveItemUpdate);

playlistsRouter.route('/:id/playlistItems/:itemId').put(authorize, _playlistsController.playlistItemUpdate);

exports.default = playlistsRouter;
//# sourceMappingURL=playlistsRouter.js.map