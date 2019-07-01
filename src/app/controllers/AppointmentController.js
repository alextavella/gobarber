import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  async store(req, res) {
    const { provider_id, date } = req.body;

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.status(201).json(appointment);
  }

  async index(req, res) {
    const { page } = req.query;
    const limit = 20;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit,
      attributes: ['id', 'date'],
      offset: (page - 1) * limit,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(appointments);
  }
}

export default new AppointmentController();
