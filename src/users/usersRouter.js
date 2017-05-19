import {Router} from 'express';
import {
  usersIndex,
  userShow,
  idParam,
  userPlaylists,
  findOrCreateUser
} from './usersController';

const usersRouter = new Router();

usersRouter.param('id', idParam);

usersRouter.route('/')
  .get(usersIndex)
  .post(findOrCreateUser);

usersRouter.route('/:id')
  .get(userShow);

usersRouter.route('/:id/playlists')
  .get(userPlaylists);

export default usersRouter;
