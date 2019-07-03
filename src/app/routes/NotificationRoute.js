import NotificationController from '../controllers/NotificationController';
import NotificationValidation from '../validations/NotificationValidation';

import authMiddleware from '../middleware/auth';

export default routes => {
  routes
    .route('/notifications/:id?')
    .get(
      authMiddleware,
      NotificationValidation.checkIsProvider,
      NotificationController.index
    )
    .put(authMiddleware, NotificationController.update);

  return routes;
};
