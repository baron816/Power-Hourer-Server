import {mongoose} from '../config/config';

const PlaylistItemsSchema = new mongoose.Schema({
  startTime: Number,
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
  },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'playlist',
    required: true,
  },
});

export default mongoose.model('playlistItem', PlaylistItemsSchema);
