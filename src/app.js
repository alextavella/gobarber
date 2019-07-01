import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'upload'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
