import SessionController from '../controllers/SessionController';
import SessionValidation from '../validations/SessionValidation';
import SessionHttpValidation from '../validations/SessionHttpValidation';

export default routes => {
  routes
    .route('/session')
    .post(
      SessionHttpValidation.login,
      SessionValidation.login,
      SessionController.login
    );

  return routes;
};
