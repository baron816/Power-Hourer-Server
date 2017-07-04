import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const PlaylistSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  playlistId: {
    type: String,
    required: true,
  },
  defaultStart: Number,
  defaultLength: Number,
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  playlistItems: [
    {
      startTime: Number,
      videoLength: Number,
      videoId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      }
    }
  ],
  exposed: {
    type: Boolean,
    default: true,
  },
  playCount: {
    type: Number,
    default: 0,
  },
});

PlaylistSchema.methods = {
  movePlaylistItem(previousIndex, newIndex) {
    const array = this.playlistItems;
    if (newIndex >= array.length) {
      let k = newIndex - array.length;
      while (k-- + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
    this.save();
  },

  excludeKeys(...args) {
    return Object.keys(this._doc).reduce(function (acc, key) {
      if (!args.includes(key)) {
        acc[key] = this._doc[key];
      }
      return acc;
    }.bind(this), {});
  }
};

PlaylistSchema.plugin(mongoosePaginate);

export default mongoose.model('playlist', PlaylistSchema);
