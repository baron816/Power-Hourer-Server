// import {mongoose} from '../config/config';
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

export default mongoose.model('users', UserSchema);
