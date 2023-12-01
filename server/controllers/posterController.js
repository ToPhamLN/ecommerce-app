import Poster from "../models/posterModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createPoster = async (req, res, next) => {
  try {
    const { title, description, path } = req.body;
    const newPoster = new Poster({
      title,
      description,
      path,
      picture: {
        path: req.file.path,
        filename: req.file.filename,
      },
    });
    const poster = await newPoster.save();
    res.status(200).json({
      message: "Poster saved successfully",
      poster,
    });
  } catch (error) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    next(error);
  }
};

export const updatePoster = async (req, res, next) => {
  try {
    let fileDel;
    const { title, description, path } = req.body;
    const poster = await Poster.findById(req.params.posterId);
    if (!poster)
      return res.status(404).json({
        message: "Poster not found!",
      });
    const newPoster = {
      title: title,
      description: description,
      path: path,
    };
    if (req.file) {
      fileDel = poster.picture.filename;
      newPoster.picture = {
        path: req.file.path,
        filename: req.file.filename,
      };
    }
    const result = await Poster.updateOne(
      { _id: poster._id },
      { $set: newPoster }
    );
    if (result.nModified === 0) {
      return res.status(400).json({
        message: "Poster can't updated",
      });
    } else {
      if (fileDel) {
        await cloudinary.uploader.destroy(fileDel);
      }
    }
    res.status(200).json({
      message: "User updated successfully",
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getPoster = async (req, res, next) => {
  try {
    const poster = await Poster.findById(req.params.posterId);
    res.status(200).json(poster);
  } catch (error) {
    next(error);
  }
};

export const getAllPoster = async (req, res, next) => {
  try {
    const posters = await Poster.find();
    res.status(200).json(posters);
  } catch (error) {
    next(error);
  }
};

export const deletePoster = async (req, res, next) => {
  try {
    const poster = await Poster.findById(req.params.posterId);
    const fileDel = poster.picture?.filename;
    await Poster.findByIdAndDelete({
      _id: req.params.posterId,
    });
    await cloudinary.uploader.destroy(fileDel);
    res.status(200).json({
      message: "Poster deleted",
    });
  } catch (error) {
    next(error);
  }
};
