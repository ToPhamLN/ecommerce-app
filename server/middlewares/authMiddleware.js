import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

// desc: Check if user is logged in
export const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY,
      async (err, user) => {
        if (err) {
          res.status(403).json({
            message: "Token is not valid",
          });
        }
        try {
          const existed = await User.findById(user.userID);
          if (!existed) {
            res.status(403).json({
              message: "User is not valid",
            });
          }
          req.user = existed;
          next();
        } catch (error) {
          res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
          });
        }
      }
    );
  } else {
    res.status(401).json({
      message: "You're not authenticated!",
    });
  }
};

//desc: check if user was admin and authenticated
export const verifyTokenAndAuthAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You're not authorized to perform this action!",
      });
    }
  });
};
