import { startOfHour, parseISO } from 'date-fns';

import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointmentValidation {
  async create(req, res, next) {
    const { provider_id } = req.body;

    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    if (req.userId === provider_id) {
      return res
        .status(401)
        .json({ error: 'You can not to create appointment to yourself' });
    }

    return next();
  }

  async checkAvaliability(req, res, next) {
    const { provider_id, date } = req.body;

    const hourStart = startOfHour(parseISO(date));

    const appointment = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (appointment) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    return next();
  }
}

export default new AppointmentValidation();
