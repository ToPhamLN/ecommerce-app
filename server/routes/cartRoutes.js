import express from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getAllCartForUser,
  getCart,
  updateCart,
} from "../controllers/cartController.js";
import {
  verifyToken,
  AuthCart,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createCart);
router.get("/all", verifyToken, getAllCart);
router.get("/:cartId", AuthCart, getCart);
router.delete("/delete/:cartId", AuthCart, deleteCart);
router.put("/update/:cartId", AuthCart, updateCart);

router.get("/sell/all", verifyToken, getAllCartForUser);

export default router;
