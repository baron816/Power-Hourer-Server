import {Router} from 'express';
import {
  idParam,
  userPlaylists,
  findOrCreateUser
} from './usersController';
import { decodeToken } from '../auth/auth';

const usersRouter = new Router();

// usersRouter.param('id', idParam);

usersRouter.route('/')
  .post(findOrCreateUser);

usersRouter.route('/playlists')
  .get(decodeToken(), userPlaylists);

export default usersRouter;
