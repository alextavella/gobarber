import SessionController from '../controllers/SessionController';
import SessionValidation from '../validations/SessionValidation';

export default routes => {
  routes
    .route('/session')
    .post(SessionValidation.exist, SessionController.login);

  return routes;
};
