export default new (class {
  checkAvailable(req, res, next) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    return next();
  }
})();
