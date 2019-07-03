import AppointmentController from '../controllers/AppointmentController';
import AppointmentHttpValidation from '../validations/AppointmentHttpValidation';
import AppointmentValidation from '../validations/AppointmentValidation';

import authMiddleware from '../middleware/auth';

export default routes => {
  routes
    .route('/appointments/:id?')
    .get(authMiddleware, AppointmentController.index)
    .post(
      authMiddleware,
      AppointmentHttpValidation.create,
      AppointmentHttpValidation.checkDate,
      AppointmentValidation.create,
      AppointmentValidation.checkAvaliability,
      AppointmentController.store
    )
    .delete(
      authMiddleware,
      AppointmentValidation.remove,
      AppointmentController.remove
    );

  return routes;
};
