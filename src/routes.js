import Router from 'express';

import SessionRoute from './app/routes/SessionRoute';
import UserRoute from './app/routes/UserRoute';
import FileRoute from './app/routes/FileRoute';
import ProviderRoute from './app/routes/ProviderRoute';

const routes = new Router();

const myRoutes = [SessionRoute, UserRoute, FileRoute, ProviderRoute];

routes.route('/').get((req, res) => res.status(200).send('Go Barber!'));
routes.route('/status').get((req, res) => res.status(200).send('OK'));

myRoutes.map(route => route(routes));

export default routes;
