import express from 'express';
import cors from 'cors';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import setUpMongoose from './config/setup-mongoose'
import config from './config/config';
import usersRouter from './users/usersRouter';
import playlistsRouter from './playlists/playlistsRouter';

export default async function start() {
  const app = express();
  app.use(cors());

  app.use(morgan('combined'));
  app.use(bodyParser.json());

  const { cleanup } = await setUpMongoose();

  app.use('/users', usersRouter);
  app.use('/playlists', playlistsRouter);

  app.use(function(req, res) {
    res.status(404).json({url: req.url});
  });

  app.use(function(err, req, res) {
    res.status(500).json({
      error: err,
    });
  });

  return new Promise(function (resolve) {
    const server = app.listen(config.port, function () {
      console.log(`Listening on port ${config.port}`)
      server.on('close', function () {
        cleanup()
      });
      resolve(server)
    });
  });
}
