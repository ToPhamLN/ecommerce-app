import { v2 as cloudinary } from "cloudinary";
import Category from "../models/categoryModel.js";
import { convertSlug } from "../utils/format.js";

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
      properties: req.body.properties.split(","),
      slug: convertSlug(req.body.name),
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
    const category = await Category.findById(
      req.params.categoryId
    );
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    let newCategory = {
      name: req.body.name || category.name,
      description: req.body.description || category.description,
      picturePath: category.picturePath,
      pictureKey: category.pictureKey,
      properties: req.body.properties.split(","),
    };

    if (req.file) {
      const fileDel = category?.pictureKey;
      newCategory.picturePath = req.file.path;
      newCategory.pictureKey = req.file.filename;

      if (fileDel) {
        await cloudinary.uploader.destroy(fileDel);
      }
    }

    const result = await Category.updateOne(
      { _id: req.params.categoryId },
      { $set: newCategory },
      { new: true }
    );

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
    const category = await Category.findById(
      req.params.categoryId
    );
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
    let query = {};
    let sort = {};
    // let page = parseInt(req.query.page) || 1;
    // const limit = 5;
    // let skip = (page - 1) * limit;
    query.slug = {
      $regex: new RegExp(req.query.search, "i"),
    };
    sort.updatedAt = req.query.update;
    const categories = await Category.find(query).sort(sort);
    // .skip(skip)
    // .limit(limit);
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
    const category = await Category.findById(
      req.params.categoryId
    );
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
