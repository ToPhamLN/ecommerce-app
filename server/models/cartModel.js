import mongoose, { Schema, model } from "mongoose";

import moment from "moment";

// const customDateFormat = "dddd, MMM Do YY, h:mm:ss a";

// mongoose.set("toJSON", {
//   transform: function (doc, ret) {
//     ret.createdAt = moment(ret.createdAt).format(customDateFormat);
//     ret.updatedAt = moment(ret.updatedAt).format(customDateFormat);
//     return ret;
//   },
// });

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    ram: {
      type: String,
      default: undefined,
    },
    storage: {
      type: String,
      default: undefined,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not_Processed",
      enum: [
        "Not_Processed",
        "Processing",
        "Shipped",
        "Delevered",
        "Canceled",
      ],
    },
  },
  { timesptamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
