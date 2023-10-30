import mongoose, { Schema, model } from "mongoose";
// import moment from "moment";

// const customDateFormat = "DD/MM/YYYY HH:mm";

// mongoose.set("toJSON", {
//   transform: function (doc, ret) {
//     ret.createdAt = moment(ret.createdAt).format(customDateFormat);
//     ret.updatedAt = moment(ret.updatedAt).format(customDateFormat);
//     return ret;
//   },
// });
const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: {
        path: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: Date,
      default: Date("1990-01-01"),
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
