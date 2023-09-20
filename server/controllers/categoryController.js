import { v2 as cloudinary } from "cloudinary";
import Category from "../models/categoryModel.js";

// @desc    Create new category
// route    POST api/category/create
// @access  private Auth
export const createCategory = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
      picturePath: req.file.path,
      pictureKey: req.file.filename,
    });
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Update category
// route    PUT api/categories/update/:categoryId
// @access  private Auth
export const updateCategory = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File not found",
      });
    }
    const category = await Category.findById(req.params.categoryId);
    const fileDel = category?.pictureKey;
    const newCategory = {
      name: req.body.name || category.name,
      description: req.body.description || category.description,
      picturePath: req.file.path || category.picturePath,
      pictureKey: req.file.filename || category.picture,
    };
    const result = await Category.updateOne(
      { id: req.params.categoryId },
      { $set: newCategory },
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
      message: "Updated successfully",
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

// @desc    Delete category
// route    DELETE api/categories/delete/:categoryId
// @access  private Auth
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const fileDel = category?.pictureKey;
    const result = await Category.findByIdAndDelete({
      _id: req.params.categoryId,
    });
    await cloudinary.uploader.destroy(fileDel);
    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all category
// route    GET api/categories/all
// @access  private Auth
export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get category
// route    GET api/categories/:categoryId
// @access  private Auth
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
