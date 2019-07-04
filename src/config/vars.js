require('dotenv/config');

module.exports = {
  url: process.env.APP_URL,
  env: process.env.NODE_ENV,
  auth: {
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.AUTH_EXPIRES,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};
