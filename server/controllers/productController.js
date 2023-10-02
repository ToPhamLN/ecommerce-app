import { v2 as cloudinary } from "cloudinary";

import Product from "../models/productModel.js";
import convertSlug from "../utils/convertSlug.js";

// @desc    Create new product
// route    POST api/products/create
// @access  private Auth
export const createProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }

    const newProduct = new Product({
      name: req.body.name,
      content: req.body.content,
      picturePath: req.file.path,
      pictureKey: req.file.filename,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      size: req.body.size ? req.body.size.split(",") : undefined,
      color: req.body.color
        ? req.body.color.split(",")
        : undefined,
      ram: req.body.ram ? req.body.ram.split(",") : undefined,
      storage: req.body.storage
        ? req.body.storage.split(",")
        : undefined,
      slug: convertSlug(req.body.name),
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Update product
// route    PUT api/products/update/:productId
// @access  private Auth
export const updateProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const product = await Product.findById({
      _id: req.params.productId,
    });
    const fileDel = product?.pictureKey;
    const newProduct = {
      name: req.body.name || product.name,
      content: req.body.content || product.content,
      quantity: req.body.quantity || product.quantity,
      picturePath: req.file.path || product.picturePath,
      pictureKey: req.file.filename || product.picture,
      price: req.body.price || product.price,
      category: req.body.category || product.category,
      brand: req.body.brand || product.brand,
      size: req.body.size
        ? req.body.size.split(",")
        : product.size,
      color: req.body.color
        ? req.body.color.split(",")
        : product.color,
      ram: req.body.ram ? req.body.ram.split(",") : product.ram,
      storage: req.body.storage
        ? req.body.storage.split(",")
        : undefined,
      slug: convertSlug(req.body.name),
    };
    const result = await Product.updateOne(
      { _id: req.params.productId },
      { $set: newProduct },
      { new: true }
    );
    if (result.nModified === 0) {
      return res.status(404).json({
        message: "Cannot update",
      });
    } else {
      if (fileDel) {
        await cloudinary.uploader.destroy(fileDel);
      }
    }
    res.status(200).json({
      message: "Product updated",
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    delete product
// route    DELETE api/products/delete/:productId
// @access  public
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById({
      _id: req.params.productId,
    });
    const fileDel = product?.pictureKey;
    const result = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });
    await cloudinary.uploader.destroy(fileDel);
    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all product
// route    POST api/products/all
// @access  public
export const getAllProduct = async (req, res, next) => {
  try {
    let query = {};
    let sort = {};
    let page = parseInt(req.query.page) || 1;
    const limit = 5;
    let skip = (page - 1) * limit;
    query.slug = {
      $regex: new RegExp(req.query.search, "i"),
    };
    sort.text = req.query.text;
    sort.updatedAt = req.query.update;
    const products = await Product.find(query)
      .sort(sort)
      .populate("category")
      .populate("brand");
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get  product
// route    GET api/products/:productId
// @access  public
export const getProduct = async (req, res, next) => {
  try {
    console.log(req.params.productId);
    const product = await Product.findById({
      _id: req.params.productId,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
