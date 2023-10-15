import mongoose, { Schema, model } from "mongoose";

const alertSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    content: {
      type: String,
      required: [true, "Please enter a content"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter a user"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Alert = model("Alert", alertSchema);

export default Alert;
