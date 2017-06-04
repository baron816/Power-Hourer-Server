import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../config/config';

const checkToken = expressJwt({ secret: config.secret});

export function signToken(id) {
  return jwt.sign(
    {_id: id},
    config.secret,
    {expiresIn: config.expireTime}
  );
}

export function decodeToken() {
  return function (req, res, next) {
    if (req.query && req.query.hasOwnProperty('id_token')) {
      req.headers.authorization = 'Bearer ' + req.query.id_token;
    }

    checkToken(req, res, next);
  };
}

export function authorizeUser() {
  return function (req, res, next) {
    if (req.user._id !== String(req.playlist.owner)) {
      res.sendStatus(401);
    } else {
      next();
    }
  };
}
