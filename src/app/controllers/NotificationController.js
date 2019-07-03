import Notification from '../schemas/Notification';

export default new (class {
  async index(req, res) {
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.status(200).json(notifications);
  }

  async update(req, res) {
    const { id: notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        read: true,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(notification);
  }
})();
