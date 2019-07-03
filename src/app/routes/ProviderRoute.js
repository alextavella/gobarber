import ProviderController from '../controllers/ProviderController';
import ProviderHttpValidation from '../validations/ProviderHttpValidations';

export default routes => {
  routes.route('/providers').get(ProviderController.index);

  routes
    .route('/providers/:providerId/available')
    .get(ProviderHttpValidation.checkAvailable, ProviderController.available);

  return routes;
};
