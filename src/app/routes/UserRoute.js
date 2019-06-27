import UserController from '../controllers/UserController';
import UserValidation from '../validations/UserValidations';

export default routes => {
  routes.route('/user').post(UserValidation.exist, UserController.store);

  return routes;
};
