import Feedback from "../models/feedbackModel.js";

export const createFeedback = async (req, res, next) => {
  const user = req.user;
  const { title, content, sender } = req.body;
  try {
    const newFeedback = new Feedback({
      title,
      content,
      sender: user._id,
    });

    const feedback = await newFeedback.save();
    res.status(201).json({
      message: "Feedback sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const { title, content, reply } = req.body;

    const feedback = await Feedback.findById(feedbackId);

    const newFeedback = {
      title: title ? title : feedback.title,
      content: content ? content : feedback.content,
      reply: reply ? reply : feedback.reply,
    };

    const result = await Feedback.updateOne(
      { _id: feedbackId },
      { $set: newFeedback },
      { new: true }
    );
    res.status(200).json({
      message: "Feedback updated successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;

    const result = await Feedback.findByIdAndDelete(feedbackId);
    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findById(
      feedbackId
    ).populate({
      path: "sender",
      select: "-password",
    });
    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

export const getAllFeedback = async (req, res, next) => {
  try {
    const user = req.user;
    const query = {};
    if (user.isAdmin === false) {
      query.sender = user._id;
    }
    const feedback = await Feedback.find(query).populate({
      path: "sender",
      select: "-password",
    });
    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};
