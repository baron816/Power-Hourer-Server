import {Router} from 'express';
import {
  playlistsIndex,
  playlistsCreate,
  playlistItems,
  playlistDelete,
  playlistItemShow,
  playlistItemUpdate,
  idParam,
  playlistItemParam,
  moveItemUpdate
} from './playlistsController';

const playlistsRouter = new Router();

playlistsRouter.param('id', idParam);
playlistsRouter.param('itemId', playlistItemParam);

playlistsRouter.route('/')
  .get(playlistsIndex)
  .post(playlistsCreate);

playlistsRouter.route('/:id/playlistItems')
  .get(playlistItems);

playlistsRouter.route('/:id/')
  .delete(playlistDelete);

playlistsRouter.route('/:id/moveItem')
  .put(moveItemUpdate);

playlistsRouter.route('/:id/playlistItems/:itemId')
  .put(playlistItemUpdate)
  .get(playlistItemShow);

export default playlistsRouter;
