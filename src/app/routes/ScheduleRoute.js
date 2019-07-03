import ScheduleController from '../controllers/ScheduleController';
import ScheduleValidation from '../validations/ScheduleValidation';
import ScheduleHttpValidation from '../validations/ScheduleHttpValidation';

import authMiddleware from '../middleware/auth';

export default routes => {
  routes
    .route('/schedule')
    .get(
      authMiddleware,
      ScheduleHttpValidation.index,
      ScheduleValidation.checkUserProvider,
      ScheduleController.index
    );

  return routes;
};
