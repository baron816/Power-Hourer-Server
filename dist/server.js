'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _usersRouter = require('./users/usersRouter');

var _usersRouter2 = _interopRequireDefault(_usersRouter);

var _playlistsRouter = require('./playlists/playlistsRouter');

var _playlistsRouter2 = _interopRequireDefault(_playlistsRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

app.use((0, _morgan2.default)('combined'));
app.use(_bodyParser2.default.json());

app.use('/users', _usersRouter2.default);
app.use('/playlists', _playlistsRouter2.default);

app.use(function (req, res) {
  res.status(404).json({ url: req.url });
});

app.use(function (err, req, res) {
  res.status(500).json({
    error: err
  });
});

exports.default = app;
//# sourceMappingURL=server.js.map