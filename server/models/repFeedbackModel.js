import mongoose, { Schema, model } from "mongoose";

const repFeedbackSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter a content"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
  },
  {
    timestamps: true,
  }
);

const reqFeedback = model("reqFeedback", repFeedbackSchema);

export default reqFeedback;
