import User from '../models/User';

export default new (class {
  async checkIsProvider(req, res, next) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    return next();
  }
})();
