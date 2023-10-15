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
    totalPrice: {
      type: Number,
      default: 0,
    },
    currentcy: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      required: [true, "You must enter a valid Cart username"],
    },
    email: {
      type: String,
      required: [true, "You must enter a valid Cart email"],
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
    },
    paymentMethod: {
      type: String,
      required: [true, "You must enter a valid Cart payment"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
