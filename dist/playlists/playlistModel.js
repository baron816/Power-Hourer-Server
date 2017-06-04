'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config/config');

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlaylistSchema = new _config.mongoose.Schema({
  owner: {
    type: _config.mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  playlistId: {
    type: String,
    required: true
  },
  defaultStart: Number,
  defaultLength: Number,
  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  playlistItems: [{
    startTime: Number,
    videoLength: Number,
    videoId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  }],
  exposed: {
    type: Boolean,
    default: true
  },
  playCount: {
    type: Number,
    default: 0
  }
});

PlaylistSchema.methods = {
  movePlaylistItem: function movePlaylistItem(previousIndex, newIndex) {
    var array = this.playlistItems;
    if (newIndex >= array.length) {
      var k = newIndex - array.length;
      while (k-- + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
    this.save();
  }
};

PlaylistSchema.plugin(_mongoosePaginate2.default);

exports.default = _config.mongoose.model('playlist', PlaylistSchema);
//# sourceMappingURL=playlistModel.js.map