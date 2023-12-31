import { v2 as cloudinary } from "cloudinary";

import Product from "../models/productModel.js";
import {
  convertSlug,
  convertObjectArr,
} from "../utils/format.js";

// @desc    Create new product
// route    POST api/products/create
// @access  private Auth
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      content,
      oldprice,
      price,
      category,
      brand,
      properties,
    } = req.body;

    let pictures = [];

    if (req.files) {
      pictures = req.files.map((item) => {
        return {
          path: item.path,
          filename: item.filename,
        };
      });
    }
    const newProduct = new Product({
      name,
      content,
      oldprice,
      price,
      category,
      brand,
      properties,
      pictures: pictures,
      slug: convertSlug(name),
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    if (req.files) {
      for (const item of req.files) {
        await cloudinary.uploader.destroy(item.filename);
      }
    }
    next();
  }
};

// @desc    Update product
// route    PUT api/products/update/:productId
// @access  private Auth
export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      content,
      oldprice,
      price,
      category,
      brand,
      properties,
      isSell,
    } = req.body;

    const product = await Product.findById({
      _id: req.params.productId,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found" });
    }

    const newProduct = {
      name,
      content,
      oldprice,
      price,
      category,
      brand,
      properties,
      isSell,
      pictures: product.pictures,
      slug: convertSlug(name),
    };

    if (req.files.length > 0) {
      const pictures = req.files.map((item) => {
        return {
          path: item.path,
          filename: item.filename,
        };
      });
      newProduct.pictures = pictures;
      for (const item of product.pictures) {
        await cloudinary.uploader.destroy(item.filename);
      }
    }

    await Product.updateOne(
      { _id: req.params.productId },
      { $set: newProduct },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated",
    });
  } catch (error) {
    if (req.files) {
      for (const item of req.files) {
        await cloudinary.uploader.destroy(item.filename);
      }
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
    const result = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });
    for (const item of product.pictures) {
      await cloudinary.uploader.destroy(item.filename);
    }
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
    sort.updatedAt = req.query.update;
    const products = await Product.find(query)
      .populate("category")
      .populate("brand")
      .sort(sort);
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

export const getAllSell = async (req, res, next) => {
  try {
    let query = {};
    let sort = {};
    let page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let skip = (page - 1) * limit;
    query.isSell = "true";
    if (req.query.search)
      query.slug = {
        $regex: new RegExp(convertSlug(req.query.search), "i"),
      };
    if (req.query.gtePrice && req.query.ltePrice) {
      query.price = {
        $gte: parseInt(req.query.gtePrice),
        $lte: parseInt(req.query.ltePrice),
      };
    }
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    sort.slug = req.query.sort;
    const products = await Product.find(query)
      .populate("category")
      .populate("brand")
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductSell = async (req, res, next) => {
  try {
    const product = await Product.findById({
      _id: req.params.productId,
    })
      .populate("category")
      .populate("brand")
      .exec();
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
