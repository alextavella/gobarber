import User from '../models/User';

class UserValidation {
  async exist(req, res, next) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send('User already exists.');
    }

    return next();
  }
}

export default new UserValidation();
