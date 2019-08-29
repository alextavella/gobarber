import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const { id, name, email, provider } = await User.create(req.body);

    return res.status(201).json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
