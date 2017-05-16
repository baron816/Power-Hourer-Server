import {mongoose} from '../config/config';

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
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: false,
  },
  playCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('playlist', PlaylistSchema);
