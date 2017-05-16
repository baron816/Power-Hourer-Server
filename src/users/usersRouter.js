import {Router} from 'express';
import {usersIndex, usersCreate, userShow, idParam, userPlaylists} from './usersController';

const usersRouter = new Router();

usersRouter.param('id', idParam);

usersRouter.route('/')
  .get(usersIndex)
  .post(usersCreate);

usersRouter.route('/:id')
  .get(userShow);

usersRouter.route('/:id/playlists')
  .get(userPlaylists);

export default usersRouter;
