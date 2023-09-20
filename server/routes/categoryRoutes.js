import express from "express";

import uploadCloud from "../middlewares/uploader.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", uploadCloud.single("picture"), createCategory);
router.get("/all", getAllCategory);
router.get("/:categoryId", getCategory);
router.delete("/delete/:categoryId", deleteCategory);
router.put(
  "/update/:categoryId",
  uploadCloud.single("picture"),
  updateCategory
);

export default router;
