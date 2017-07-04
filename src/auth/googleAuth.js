import GoogleAuth from 'google-auth-library';

export default function googleAuth(next, idToken, fn) {
  const auth = new GoogleAuth;
  const client = new auth.OAuth2(process.env.CLIENT_ID);

  client.verifyIdToken(
    idToken,
    process.env.CLIENT_ID,
    function (err, login) {
      if (err) {
        next(err)
      } else {
        const payload = login.getPayload();
        const googleId = payload['sub'];

        fn(googleId)
      }
    }
  )
}
