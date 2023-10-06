import express from "express";

import uploadCloud from "../middlewares/uploader.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllSell,
  getProduct,
  getProductSell,
  updateProduct,
} from "../controllers/productController.js";

import {
  verifyTokenAndAuthAdmin,
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  uploadCloud.array("picture", 5),
  createProduct
);
router.get("/all", verifyTokenAndAuthAdmin, getAllProduct);
router.get("/:productId", getProduct);
router.put(
  "/update/:productId",
  verifyTokenAndAuthAdmin,
  uploadCloud.array("picture", 5),
  updateProduct
);
router.delete(
  "/delete/:productId",
  verifyTokenAndAuthAdmin,
  deleteProduct
);

router.get("/sell/all", getAllSell);
router.get("/sell/:productId", verifyToken, getProductSell);

export default router;
