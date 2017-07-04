import mongoose from 'mongoose';

mongoose.Promise = Promise

async function setupMongoose() {
  if ('MONGODB_DEBUG' in process.env) {
    mongoose.set('debug', true)
  }

  if (process.env.MONGODB_URI) {
    await connect(process.env.MONGODB_URI)
  } else {
    await connect('mongodb://localhost/power-hourer-test')
  }

  function cleanup() {
    mongoose.connection.close()
  }

  function reset() {
    mongoose.connection.db.dropDatabase()
  }

  return {
    cleanup,
    reset
  }
}

function connect(uri) {
  return mongoose.connect(uri).catch(function (error) {
    console.error(
      'There was a problem connecting mongoose to mongodb',
      'Do you have mongodb running?'
    );
    return Promise.reject(error);
  })
}

export default setupMongoose
