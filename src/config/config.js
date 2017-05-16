import mongoose from 'mongoose';
import bluebird from 'bluebird';

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3001,
  expireTime: 24 * 60 * 10,
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
  envConfig = require('./' + config.env).default;
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
export default Object.assign(config, envConfig);


mongoose.Promise = bluebird;
mongoose.connect(envConfig.db.url);

export {mongoose};
