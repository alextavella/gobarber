import ProviderController from '../controllers/ProviderController';

export default routes => {
  routes.route('/providers').get(ProviderController.index);

  return routes;
};
