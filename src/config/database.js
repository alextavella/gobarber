module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  port: 5432,
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
