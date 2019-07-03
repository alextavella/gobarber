export default new (class {
  async index(req, res, next) {
    const { date } = req.query;

    if (!date) {
      return res.status(401).json({ error: 'Date is required' });
    }

    return next();
  }
})();
