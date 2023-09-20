import express from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/create", createCart);
router.get("/all", getAllCart);
router.get("/:cartId", getCart);
router.delete("/delete/:cartId", deleteCart);
router.put("/update/:cartId", updateCart);

export default router;
