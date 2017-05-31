'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _playlistsController = require('./playlistsController');

var playlistsRouter = new _express.Router();

playlistsRouter.param('id', _playlistsController.idParam);
playlistsRouter.param('itemId', _playlistsController.playlistItemParam);

playlistsRouter.route('/').get(_playlistsController.playlistsIndex).post(_playlistsController.playlistsCreate);

playlistsRouter.route('/:id/playlistItems').get(_playlistsController.playlistItems);

playlistsRouter.route('/:id/incrementPlayCount').put(_playlistsController.playlistIncrementPlayCount);

playlistsRouter.route('/:id/').put(_playlistsController.playlistUpdate).delete(_playlistsController.playlistDelete);

playlistsRouter.route('/:id/moveItem').put(_playlistsController.moveItemUpdate);

playlistsRouter.route('/:id/playlistItems/:itemId').put(_playlistsController.playlistItemUpdate);

exports.default = playlistsRouter;
//# sourceMappingURL=playlistsRouter.js.map