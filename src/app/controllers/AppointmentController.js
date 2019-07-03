import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import Mail from '../../lib/Mail';

class AppointmentController {
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

  async store(req, res) {
    const { provider_id, date } = req.body;

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // Notification provider
    const user = await User.findByPk(req.userId);
    const dateFormatted = format(parseISO(date), "dd 'de' MMMM, 'às' H:mm'h'", {
      locale: ptBR,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para dia ${dateFormatted}`,
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

    const dateFormatted = format(
      appointment.date,
      "'dia' dd 'de' MMMM, 'às' H:mm'h'",
      {
        locale: ptBR,
      }
    );

    // Mail
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cencellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: dateFormatted,
      },
    });

    return res.status(200).json(appointment);
  }
}

export default new AppointmentController();
