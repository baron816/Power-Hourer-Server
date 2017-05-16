import {Router} from 'express';
import {playlistsIndex, playlistsCreate, playlistItems, playlistDelete, idParam} from './playlistsController';

const playlistsRouter = new Router();

playlistsRouter.param('id', idParam);

playlistsRouter.route('/')
  .get(playlistsIndex)
  .post(playlistsCreate);

playlistsRouter.route('/:id/playlistItems')
  .get(playlistItems);

playlistsRouter.route('/:id/')
  .delete(playlistDelete);

export default playlistsRouter;
