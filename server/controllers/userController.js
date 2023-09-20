import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import User from "./../models/userModel.js";
import convertSlug from "./../utils/convertSlug.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

const refreshTokens = [];

// @desc    Auth user register
// route    POST api/users/register
// @access  public
export const postRegister = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username },
        { slug: convertSlug(req.body.username) },
      ],
    });
    if (existedUser) {
      return res.status(400).json({
        message: "User already existed",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      address: req.body.address,
      contact: req.body.contact,
      slug: convertSlug(req.body.username),
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user login /set token
// route    POST api/users/login
// @access  public
export const postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found, please try again!",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json({
        message: "Wrong password, please try again!",
      });
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...others } = user._doc;
      res
        .status(200)
        .json({ ...others, accessToken, refreshToken });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user get profile
// route    GET api/users/profile
// @access  private
export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user update auth
// route    PUT api/users/auth
// @access  private
export const updateAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const existedUser = await User.findOne({
      $or: [
        { email: req.body.email || user.email },
        { username: req.body.username || user.username },
        {
          slug: req.body.username
            ? convertSlug(req.body.username)
            : user.slug,
        },
      ],
    });
    if (existedUser?._id == user?._id) {
      return res.status(400).json({
        message: "User already existed",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    let newUser = {
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      birthday: req.body.birthday || user.birthday,
      address: req.body.address || user.address,
      contact: req.body.contact || user.contact,
      slug: req.body.username
        ? convertSlug(req.body.username)
        : user.slug,
    };
    if (req.body.password) {
      newUser.password = hashed;
    }
    const result = await User.updateOne(
      { _id: user._id },
      { $set: newUser }
    );
    if (result.nModified === 0) {
      return res.status(400).json({
        message: "User not updated",
      });
    }
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user update auth
// route    PUT api/users/avatar
// @access  private
export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const user = req.user;
    console.log(user, req.body, req.file);

    let newUser = {
      avatar: {
        path: req.file.path,
        filename: req.file.filename,
      },
    };
    const filenameDel = user.avatar?.filename;
    const result = await User.updateOne(
      { _id: user._id },
      { $set: newUser }
    );
    if (result.nModified === 0) {
      return res.status(400).json({
        status: "error",
        message: "User can't updated",
      });
    } else {
      if (filenameDel) {
        await cloudinary.uploader.destroy(filenameDel);
      }
    }
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      result: result,
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Auth user update auth
// route    PUT api/users/background
// @access  private
export const updateBackground = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const user = req.user;
    console.log(user, req.body, req.file);

    let newUser = {
      background: {
        path: req.file.path,
        filename: req.file.filename,
      },
    };
    const filenameDel = user.background?.filename;
    const result = await User.updateOne(
      { _id: user._id },
      { $set: newUser }
    );
    if (result.nModified === 0) {
      return res.status(400).json({
        status: "error",
        message: "User can't updated",
      });
    } else {
      if (filenameDel) {
        await cloudinary.uploader.destroy(filenameDel);
      }
    }
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      result: result,
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Auth user logout
// route    DELETE api/users/delete
// @access  private
export const destroy = async (req, res, next) => {
  try {
    const user = req.user;
    const avtDel = user.avatar?.filename;
    const bgdDel = user.background?.filename;
    const userDel = await User.findOneAndDelete(user._id);
    await cloudinary.uploader.destroy(avtDel);
    await cloudinary.uploader.destroy(bgdDel);
    res.status(200).json({
      message: "User deleted",
      userDel,
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Auth user logout
// route    POST api/users/logout
// @access  private
export const postLogout = async (req, res, next) => {
  //Clear cookies when user logs out
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.token
  );
  res.clearCookie("refreshToken");
  res.status(200).json("Logged out successfully!");
};

// @desc    Auth user refresh
// route    POST api/users/refresh
// @access  private
export const postRefresh = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json("You're not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_KEY,
    (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter(
        (token) => token !== refreshToken
      );
      const newAccessToken =
        authController.generateAccessToken(user);
      const newRefreshToken =
        authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
  );
};

// @desc    get all user
// route    api/users/
// @access  public
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().sort([["createdAt", -1]]);
    res.status(200).json(users);
    if ((users.length = 0)) {
      return res.status(404).json({
        status: false,
        message: "no users",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    get user
// route    api/users/:slug
// @access  public
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      slug: req.params.slug,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// @desc    search user
// route    POST api/users/search
// @access  public
export const searchUser = async (req, res, next) => {
  try {
    const q = req.query.q;
    console.log(q);
    let keyUser = undefined;
    if (q !== "") {
      keyUser = new RegExp(convertSlug(q));
    } else {
      return res.status(404).json({
        message: "Please enter keywords",
      });
    }
    console.log(keyUser);
    const users = await User.find({
      slug: { $regex: keyUser, $options: "i" },
    });
    if (!users) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
