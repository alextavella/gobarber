import { startOfHour, parseISO, subHours, isBefore } from 'date-fns';

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

  async remove(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return res.status(400);
    }

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't permission to cancel this appointment" });
    }

    // Validate 2 hours before
    const hourDiff = 2;
    const dateWithSub = subHours(appointment.date, hourDiff);

    // console.log('appointment.date', appointment.date);
    // console.log('dateWithSub', dateWithSub);

    const now = new Date();
    // console.log('now', now);

    const isHoursBeforeEvent = isBefore(now, dateWithSub);
    // console.log('isHoursBeforeEvent', isHoursBeforeEvent);

    if (!isHoursBeforeEvent) {
      return res.status(401).json({
        error: `You can only cancel appoitments ${hourDiff} hours in advanced`,
      });
    }

    return next();
  }
}

export default new AppointmentValidation();
