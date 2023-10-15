import mongoose, { Schema, model } from "mongoose";

const discountSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },

    code: {
      type: String,
      required: [true, "Please enter a code"],
    },
    valid: {
      type: Number,
      required: [true, "Please enter a valid"],
    },
    condition: {
      type: Number,
      required: [true, "Please enter a condition"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter a quantity"],
    },
  },
  { timestamps: true }
);

const Discount = model("Discount", discountSchema);

export default Discount;
