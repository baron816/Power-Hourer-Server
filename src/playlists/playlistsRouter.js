import {Router} from 'express';
import {
  playlistsIndex,
  playlistsCreate,
  playlistItems,
  playlistDelete,
  playlistItemUpdate,
  idParam,
  playlistItemParam,
  moveItemUpdate,
  playlistUpdate,
  playlistIncrementPlayCount,
  playlistItemDelete,
  playlistItemAdd
} from './playlistsController';
import { decodeToken, authorizeUser } from '../auth/auth';

const playlistsRouter = new Router();

playlistsRouter.param('id', idParam);
playlistsRouter.param('itemId', playlistItemParam);

const authorize = [decodeToken(), authorizeUser()];

playlistsRouter.route('/')
  .get(playlistsIndex)
  .post(decodeToken(), playlistsCreate);

playlistsRouter.route('/:id/playlistItems')
  .get(playlistItems)
  .put(authorize, playlistItemAdd);

playlistsRouter.route('/:id/incrementPlayCount')
  .put(playlistIncrementPlayCount);

playlistsRouter.route('/:id/')
  .put(authorize, playlistUpdate)
  .delete(authorize, playlistDelete);

playlistsRouter.route('/:id/moveItem')
  .put(authorize, moveItemUpdate);

playlistsRouter.route('/:id/playlistItems/:itemId')
  .put(authorize, playlistItemUpdate)
  .delete(authorize, playlistItemDelete);

export default playlistsRouter;
