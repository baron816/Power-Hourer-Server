import mongoose from 'mongoose';

process.env.NODE_ENV = 'test';
mongoose.Promise = Promise;
