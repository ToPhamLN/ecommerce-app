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
    const newCart = new Cart({
      product: product._id,
      quantity: req.body.quantity,
      properties: req.body.properties,
      unitPrice: req.body.quantity * product.price,
      user: req.user.id,
      status: req.body.status,
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
    const user = req.user;
    const cart = req.cart;
    if (
      !user.isAdmin &&
      !(cart.status == "Processing" || cart.status == "Canceled")
    ) {
      return res.status(400).json({
        message: "You are not authorized to delete this cart",
      });
    }
    const result = await Cart.findByIdAndDelete({
      _id: req.params.cartId,
    });
    res.status(200).json({
      message: "Deleted successfully",
    });
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
    let query = {};
    let sort = {};
    let page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let skip = (page - 1) * limit;
    if (!req.user.isAdmin) query.user = req.user._id;
    if (req.query.status) query.status = req.query.status;
    if (req.query.gtePrice && req.query.ltePrice) {
      query.unitPrice = {
        $gte: parseInt(req.query.gtePrice),
        $lte: parseInt(req.query.ltePrice),
      };
    }
    if (req.query.sort) sort.updatedAt = req.query.sort;
    const carts = await Cart.find(query)
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
      })
      .limit(limit)
      .skip(skip)
      .sort(sort);
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
