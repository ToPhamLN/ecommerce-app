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
import { verifyTokenAndAuthAdmin } from "../middlewares/authMiddleware.js";

router.post(
  "/create",
  uploadCloud.single("picture"),
  createCategory
);
router.get("/all", getAllCategory);
router.get("/:categoryId", getCategory);
router.put(
  "/update/:categoryId",
  verifyTokenAndAuthAdmin,
  uploadCloud.single("picture"),
  updateCategory
);
router.delete(
  "/delete/:categoryId",
  verifyTokenAndAuthAdmin,
  deleteCategory
);

export default router;
