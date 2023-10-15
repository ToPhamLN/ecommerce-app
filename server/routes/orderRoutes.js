import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, getAllOrder);
router.get(":/orderId", getOrder);
router.put("/update/:orderId", updateOrder);
router.delete("/delete/:orderId", deleteOrder);

export default router;
