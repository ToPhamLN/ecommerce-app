import express from "express";

import uploadCloud from "../middlewares/uploader.js";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brandController.js";

import { verifyTokenAndAuthAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  uploadCloud.single("picture"),
  createBrand
);
router.get("/all", getAllBrand);
router.get("/:brandId", getBrand);
router.delete(
  "/delete/:brandId",
  verifyTokenAndAuthAdmin,
  deleteBrand
);
router.put(
  "/update/:brandId",
  verifyTokenAndAuthAdmin,
  uploadCloud.single("picture"),
  updateBrand
);

export default router;
