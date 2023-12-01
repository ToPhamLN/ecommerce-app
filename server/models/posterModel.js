import mongoose, { Schema, model } from "mongoose";

const posterSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, " Title must be entered"],
    },
    description: {
      type: String,
      required: [true, " Description must be entered"],
    },
    picture: {
      type: {
        path: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
      required: [true, " Picture must be entered"],
    },
    path: {
      type: String,
    },
  },
  { timestamps: true }
);

const Poster = model("Poster", posterSchema);

export default Poster;
