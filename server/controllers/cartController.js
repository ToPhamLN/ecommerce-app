import { v2 as cloudinary } from "cloudinary";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc    Create new item in cart
// route    POST api/carts/create
// @access  private Auth
export const createCart = async (req, res, next) => {
  try {
    // const user = req.user;
    const product = await Product.findById({
      _id: req.body.product,
    });
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }
    const existCart = await Cart.findOne({
      product: req.body.product,
      user: req.body.user,
    });
    if (existCart) {
      return res.status(400).json({
        message: "Product already in cart",
      });
    }
    const newCart = new Cart({
      product: req.body.product,
      quantity: req.body.quantity,
      size: req.body.size || undefined,
      color: req.body.color || undefined,
      ram: req.body.ram || undefined,
      storage: req.body.storage || undefined,
      unitPrice: req.body.quantity * product.price,
      user: req.body.user, // user.id
    });
    const cart = await newCart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all items in cart
// route    GET api/carts/:cartId
// @access  private Auth
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById({ _id: req.params.cartId });
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart
// route    PUT api/carts/update/:cartId
// @access  private Auth
export const updateCart = async (req, res, next) => {
  try {
    // const user = req.user;
    const cart = await Cart.findById({
      _id: req.params.cartId,
      user: req.body.user,
    });
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }
    const product = await Product.findById({
      _id: cart.product,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const newCart = {
      quantity: req.body.quantity,
      size: req.body.size || undefined,
      color: req.body.color || undefined,
      ram: req.body.ram || undefined,
      storage: req.body.storage || undefined,
      unitPrice: req.body.quantity * product.price,
      user: req.body.user, // user.id
    };
    const result = await Cart.updateOne(
      { _id: req.params.cartId },
      { $set: newCart },
      { new: true }
    );
    if (result.nModified === 0) {
      return res.status(400).json({
        message: "Can't update",
      });
    }
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete cart
// route    DELETE api/carts/delete/:cartId
// @access  private Auth\
export const deleteCart = async (req, res, next) => {
  try {
    const result = await Cart.findByIdAndDelete({
      _id: req.params.cartId,
    });
    if (result) {
      res.status(200).json({
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all items in cart
// route    GET api/carts/all
// @access  private Auth
export const getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
