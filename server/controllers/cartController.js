import { v2 as cloudinary } from "cloudinary";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc    Create new item in cart
// route    POST api/carts/create
// @access  private Auth
export const createCart = async (req, res, next) => {
  try {
    const product = await Product.findById({
      _id: req.body.product,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const existCart = await Cart.findOne({
      product: req.body.product,
      user: req.user.id,
    });
    if (existCart) {
      return res.status(400).json({
        message: "Product already in cart",
      });
    }
    const newCart = new Cart({
      product: product._id,
      quantity: req.body.quantity,
      properties: req.body.properties,
      unitPrice: req.body.quantity * product.price,
      user: req.user.id,
    });
    const cart = await newCart.save();
    res.status(200).json({
      message: "Added cart successfully!",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all items in cart
// route    GET api/carts/:cartId
// @access  private Auth
export const getCart = async (req, res, next) => {
  try {
    const getCart = await Cart.findById({
      _id: req.params.cartId,
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "product",
        select: "-content",
        populate: {
          path: "category brand",
          select: "name _id",
        },
      });
    if (!getCart) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }
    res.status(200).json(getCart);
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart
// route    PUT api/carts/update/:cartId
// @access  private Auth
export const updateCart = async (req, res, next) => {
  try {
    const { quantity, properties, status } = req.body;
    const cart = req.cart;
    const product = await Product.findById({
      _id: cart.product,
    });
    if (!product) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    const newCart = {
      product: product._id,
      quantity: quantity ? quantity : cart.quantity,
      properties: properties ? properties : cart.properties,
      unitPrice: quantity
        ? quantity * product.price
        : cart.unitPrice,
      status: status ? status : cart.status,
    };
    console.log(newCart, req.params);

    const result = await Cart.updateOne(
      { _id: req.params.cartId },
      { $set: newCart },
      { new: true }
    );
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

export const getAllCartForUser = async (req, res, next) => {
  try {
    const carts = await Cart.find({
      user: req.user._id,
      status: "Not_Processed",
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "product",
        select: "-content -properties",
        populate: {
          path: "category brand",
          select: "name _id",
        },
      });
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
