import Notification from "../models/NotificationModel.js";
export const createNotification = async (req, res, next) => {
  try {
    const { user, description, sendAdmin, path } = req.body;
    const newNotification = new Notification({
      description: description,
      path: path,
      sendAdmin: sendAdmin ? sendAdmin : false,
      user: user ? user : undefined,
    });
    const notification = newNotification.save();
    res.status(200).json({
      message: "Notification saved successfully",
      notification,
    });
  } catch (error) {
    next(error);
  }
};

export const readedNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const newNotification = {
      readBy: true,
    };

    const result = await Notification.updateOne(
      { _id: notificationId },
      { $set: newNotification },
      { new: true }
    );

    res.status(200).json({
      message: "Updated notification",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const result = await Notification.findByIdAndDelete({
      _id: notificationId,
    });
    res.status(200).send({ message: "Notification deleted" });
  } catch (error) {
    next(error);
  }
};

export const getAllNotification = async (req, res, next) => {
  try {
    const user = req.user;
    const query = {};
    const sort = {};
    sort.updatedAt = -1;
    if (user.isAdmin) {
      query.sendAdmin = true;
    } else {
      query.user = user._id;
    }
    const notifications = await Notification.find(query).sort(
      sort
    );
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};
