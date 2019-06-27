class SessionController {
  login(req, res) {
    return res.json(req.user);
  }
}

export default new SessionController();
