require('dotenv').config();

export default {
  port: process.env.PORT || 8000,
  expireTime: 24 * 60 * 90,
  secret: process.env.JWT_SECRET
};
