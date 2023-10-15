import mongoose, { Schema, model } from "mongoose";

// import moment from "moment";

// const customDateFormat = "dddd, MMM Do YY, h:mm:ss a";

// mongoose.set("toJSON", {
//   transform: function (doc, ret) {
//     ret.createdAt = moment(ret.createdAt).format(customDateFormat);
//     ret.updatedAt = moment(ret.updatedAt).format(customDateFormat);
//     return ret;
//   },
// });

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    content: {
      type: String,
      required: true,
    },
    pictures: {
      type: Array,
    },
    oldprice: {
      type: Number,
      required: [true, "Please enter a old price"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a price"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please enter a category"],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Please enter a brand"],
    },
    properties: {
      type: Schema.Types.Mixed,
    },
    isSell: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;

//  category: {
//       type: Schema.Types.ObjectId,
//       ref: "Category",
//       required: [true, "Please enter a category"],
//     },
//     brand: {
//       type: Schema.Types.ObjectId,
//       ref: "Brand",
//       required: [true, "Please enter a brand"],
//     },
//     size: {
//       type: Array,
//     },
//     color: {
//       type: Array,
//       default: undefined,
//     },
//     ram: {
//       type: Array,
//       default: undefined,
//     },
//     storage: {
//       type: Array,
//       default: undefined,
//     },
