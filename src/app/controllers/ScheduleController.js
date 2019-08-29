import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;

    // ex: Dates
    // 2019-07-03 00:00:00
    // 2019-07-03 23:59:59

    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name'],
          },
        ],
      },
      order: ['date'],
    });

    return res.json({ appointments });
  }
}

export default new ScheduleController();
