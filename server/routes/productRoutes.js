import express from "express";

import uploadCloud from "../middlewares/uploader.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllSell,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/create",
  uploadCloud.array("picture", 5),
  createProduct
);
router.get("/all", getAllProduct);
router.get("/sell/all", getAllSell);
router.get("/:productId", getProduct);
router.put(
  "/update/:productId",
  uploadCloud.array("picture", 5),
  updateProduct
);
router.delete("/delete/:productId", deleteProduct);
export default router;
