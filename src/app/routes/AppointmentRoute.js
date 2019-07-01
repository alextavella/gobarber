import AppointmentController from '../controllers/AppointmentController';
import AppointmentHttpValidation from '../validations/AppointmentHttpValidation';
import AppointmentValidation from '../validations/AppointmentValidation';

import authMiddleware from '../middleware/auth';

export default routes => {
  routes
    .route('/appointments')
    .get(authMiddleware, AppointmentController.index)
    .post(
      authMiddleware,
      AppointmentHttpValidation.create,
      AppointmentHttpValidation.checkDate,
      AppointmentValidation.create,
      AppointmentValidation.checkAvaliability,
      AppointmentController.store
    );

  return routes;
};
