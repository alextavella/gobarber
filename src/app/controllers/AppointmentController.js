import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const limit = 20;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit,
      attributes: ['id', 'date', 'past', 'cancelable'],
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

  async store(req, res) {
    const { provider_id, date } = req.body;

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // Notification provider
    const user = await User.findByPk(req.userId);
    const dateFormatted = format(
      parseISO(date),
      "'dia' dd 'de' MMMM, 'às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${dateFormatted}`,
      user: provider_id,
    });

    return res.status(201).json(appointment);
  }

  async remove(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    appointment.canceled_at = new Date();
    appointment.save();

    // CancellationMail Job
    Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.status(200).json(appointment);
  }
}

export default new AppointmentController();
