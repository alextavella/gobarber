import * as Yup from 'yup';
import { startOfHour, isBefore, parseISO } from 'date-fns';

class AppointmentHttpValidation {
  async create(req, res, next) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return next();
  }

  checkDate(req, res, next) {
    const { date } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    return next();
  }
}

export default new AppointmentHttpValidation();
