import {mongoose} from '../config/config';

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

export default mongoose.model('users', UserSchema);
