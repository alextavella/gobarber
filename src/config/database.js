const { database } = require('./vars');

module.exports = {
  dialect: 'postgres',
  host: database.host,
  username: database.user,
  port: 5432,
  password: database.pass,
  database: database.name,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
