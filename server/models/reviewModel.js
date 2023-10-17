import mongoose, { Schema, model } from "mongoose";

const reviewModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rate: {
      type: Number,
      required: [true, " Rate must be entered"],
    },
    comment: {
      type: String,
      required: [true, " Comment must be entered"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Review = model("Review", reviewModel);

export default Review;
