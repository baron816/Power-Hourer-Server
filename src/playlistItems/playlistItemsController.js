import PlaylistItem from './playlistItemsModel';

export function getPlaylistItem(req, res, next) {
  res.json(req.item || {});
}

export function updatePlaylistItem(req, res, next) {
  const item = req.item;
  const update = req.body;

  const updated = Object.assign(item, update);

  updated.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
}

export function idParam(req, res, next, id) {
  PlaylistItem
  .findById(id)
  .then(function(item) {
    if (item) {
      req.item = item;
      next();
    } else {
      next(new Error('Not found'));
    }
  }, function(err) {
    next(err);
  });
}
