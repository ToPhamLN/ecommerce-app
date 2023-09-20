import { v2 as cloudinary } from "cloudinary";
import Brand from "../models/brandModel.js";

// @desc    Create new brand
// route    POST api/brand/create
// @access  private Auth
export const createBrand = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const newBrand = new Brand({
      name: req.body.name,
      description: req.body.description,
      picturePath: req.file?.path,
      pictureKey: req.file?.filename,
    });
    const brand = await newBrand.save();
    res.status(200).json(brand);
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Update brand
// route    PUT api/categories/update/:brandId
// @access  private Auth
export const updateBrand = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const brand = await Brand.findById(req.params.brandId);
    const fileDel = brand?.pictureKey;
    const newBrand = {
      name: req.body.name || brand.name,
      description: req.body.description || brand.description,
      picturePath: req.file?.path,
      pictureKey: req.file?.filename,
    };
    const result = await Brand.updateOne(
      { _id: req.params.brandId },
      { $set: newBrand },
      { new: true }
    );
    if (result.nModified === 0) {
      return res.status(400).json({
        message: "Can't update",
      });
    } else {
      if (fileDel) {
        await cloudinary.uploader.destroy(fileDel);
      }
    }
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Delete brand
// route    DELETE api/brands/delete/:brandId
// @access  private Auth
export const deleteBrand = async (req, res, next) => {
  try {
    const brand = await brand.findById(req.params.brandId);
    const fileDel = brand?.pictureKey;
    const result = await Brand.findByIdAndDelete({
      _id: req.params.brandId,
    });
    await cloudinary.uploader.destroy(fileDel);
    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all brand
// route    GET api/brands/all
// @access  private Auth
export const getAllBrand = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

// @desc    Get brand
// route    GET api/categories/:brandId
// @access  private Auth
export const getBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.brandId);
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};
