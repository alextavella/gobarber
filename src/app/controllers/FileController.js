import File from '../models/File';
import User from '../models/User';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    const user = await User.findByPk(req.userId);
    const payload = { ...user, avatar_id: file.id };

    if (user.avatar_id) {
      const oldFile = await File.findByPk(user.avatar_id);
      if (oldFile) oldFile.destroy();
    }

    user.update(payload);

    return res.json(file);
  }
}

export default new FileController();
