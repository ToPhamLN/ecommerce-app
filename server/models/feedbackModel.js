import mongoose, { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    content: {
      type: String,
      required: [true, "Please enter a content"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reply: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
