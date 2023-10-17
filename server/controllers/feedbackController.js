import Feedback from "../models/feedback";

export const createFeedback = async (req, res, next) => {
  const { title, content, sender } = req.body;
  try {
    const newFeedback = new Feedback({});
  } catch (error) {
    next(error);
  }
};
