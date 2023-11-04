import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    path: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sendAdmin: {
      type: Boolean,
      default: false,
    },
    readBy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

export default Notification;
