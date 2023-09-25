import { v2 as cloudinary } from "cloudinary";
import Brand from "../models/brandModel.js";
import convertSlug from "../utils/convertSlug.js";

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
    const existBrand = await Brand.findOne({
      slug: convertSlug(req.body.name),
    });
    if (existBrand) {
      return res.status(400).json({
        message: "Brand already exist",
      });
    }
    const newBrand = new Brand({
      name: req.body.name,
      description: req.body.description,
      picturePath: req.file?.path,
      pictureKey: req.file?.filename,
      slug: convertSlug(req.body.name),
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
    const brand = await Brand.findById(req.params.brandId);
    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    let newBrand = {
      name: req.body.name || brand.name,
      description: req.body.description || brand.description,
      picturePath: brand.picturePath,
      pictureKey: brand.pictureKey,
    };

    if (req.file) {
      const fileDel = brand?.pictureKey;
      newBrand.picturePath = req.file.path;
      newBrand.pictureKey = req.file.filename;

      if (fileDel) {
        await cloudinary.uploader.destroy(fileDel);
      }
    }

    const result = await Brand.updateOne(
      { _id: req.params.brandId },
      { $set: newBrand },
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
    const brandData = await Brand.findById(req.params.brandId);
    const fileDel = brandData?.pictureKey;
    await Brand.findByIdAndDelete({
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
    const brands = await Brand.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
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
