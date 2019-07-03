import User from '../models/User';

export default new (class {
  async checkUserProvider(req, res, next) {
    const userProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!userProvider) {
      return res.status(401).json({ error: 'User is not provider' });
    }

    return next();
  }
})();
