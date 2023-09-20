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

const orderSchema = new Schema(
  {
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      required: [true, "You must enter a valid Cart address"],
    },
    contact: {
      type: String,
      required: [true, "You must enter a valid Cart contact"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
