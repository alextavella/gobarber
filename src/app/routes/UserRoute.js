import UserController from '../controllers/UserController';
import UserValidation from '../validations/UserValidations';
import UserHttpValidation from '../validations/UserHttpValidation';

import authMiddleware from '../middleware/auth';

export default routes => {
  routes
    .route('/user')
    .post(
      UserHttpValidation.create,
      UserValidation.create,
      UserController.store
    )
    .put(
      authMiddleware,
      UserHttpValidation.edit,
      UserValidation.edit,
      UserController.update
    );

  return routes;
};
