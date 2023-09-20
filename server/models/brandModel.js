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

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    picturePath: {
      type: String,
      required: [true, "Please enter a picture"],
    },
    pictureKey: {
      type: String,
    },
  },
  { timestamps: true }
);

const Brand = model("Brand", brandSchema);

export default Brand;
