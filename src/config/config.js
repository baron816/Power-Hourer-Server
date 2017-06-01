import mongoose from 'mongoose';
import bluebird from 'bluebird';

export default {
  port: process.env.PORT || 8000,
};

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/power-hourer');

export {mongoose};
