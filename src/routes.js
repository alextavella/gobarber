import Router from 'express';

import SessionRoute from './app/routes/SessionRoute';
import UserRoute from './app/routes/UserRoute';

const routes = new Router();

const myRoutes = [SessionRoute, UserRoute];

routes.route('/').get((req, res) => res.send('Hello World!'));

myRoutes.map(route => route(routes));

export default routes;
