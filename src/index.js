import app from './server';
import config from './config/config';

app.listen(config.port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port ', config.port);
  }
});
