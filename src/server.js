import express from 'express';
import cors from 'cors';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import usersRouter from './users/usersRouter';
import playlistsRouter from './playlists/playlistsRouter';
import itemsRouter from './playlistItems/playlistItemsRouter';

const app = express();
app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/playlists', playlistsRouter);
app.use('/playlistItems', itemsRouter);

app.use(function(req, res, next) {
  res.status(404).json({url: req.url});
});

app.use(function(err, req, res, next) {
  res.status(500).json({
    error: err,
  });
});

export default app;
