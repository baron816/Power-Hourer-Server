import {Router} from 'express';

import {
  idParam,
  getPlaylistItem,
  updatePlaylistItem,
} from './playlistItemsController';

const itemsRouter = new Router();

itemsRouter.param('id', idParam);

itemsRouter.route('/:id')
  .get(getPlaylistItem)
  .put(updatePlaylistItem);

export default itemsRouter;
