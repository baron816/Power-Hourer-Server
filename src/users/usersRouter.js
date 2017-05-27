import {Router} from 'express';
import {
  idParam,
  userPlaylists,
  findOrCreateUser
} from './usersController';

const usersRouter = new Router();

usersRouter.param('id', idParam);

usersRouter.route('/')
  .post(findOrCreateUser);

usersRouter.route('/:id/playlists')
  .get(userPlaylists);

export default usersRouter;
