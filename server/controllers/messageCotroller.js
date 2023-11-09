import Message from "../models/messageModel.js";

export const createMessage = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(req.body);
    const { conversationId, text } = req.body;
    const newMessage = new Message({
      conversation: conversationId,
      text,
      sender: user._id,
    });
    const message = await newMessage.save();
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversation: conversationId,
    }).populate({
      path: "sender",
      select: "-password",
    });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
