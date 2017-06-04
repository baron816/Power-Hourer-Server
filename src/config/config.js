require('dotenv').config();

import mongoose from 'mongoose';
import bluebird from 'bluebird';

export default {
  port: process.env.PORT || 8000,
  expireTime: 24 * 60 * 10,
  secret: process.env.JWT_SECRET
};

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URI);

export {mongoose};
