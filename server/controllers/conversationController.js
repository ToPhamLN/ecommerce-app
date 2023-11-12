import Conversation from "../models/conversationModel.js";

export const createConversation = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    const existedConversation = await Conversation.findOne({
      members: [senderId, receiverId],
    });
    if (!existedConversation) {
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });
      const conversation = await newConversation.save();
      res.status(200).json(conversation);
    }
    res.status(200).json(existedConversation);
  } catch (error) {
    next(error);
  }
};

export const getAllConversation = async (req, res, next) => {
  try {
    const user = req.user;
    const conversations = await Conversation.find({
      members: { $in: [user._id] },
    }).populate({
      path: "members",
      select: "-password",
    });

    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const result = await Conversation.findByIdAndDelete({
      _id: conversationId,
    });
    res.status(200).json({
      message: "Deleted successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};
