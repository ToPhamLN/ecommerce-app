import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  currentcyRange,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, getAllOrder);
router.get(":/orderId", verifyToken, getOrder);
router.put("/update/:orderId", verifyToken, updateOrder);
router.delete("/delete/:orderId", verifyToken, deleteOrder);

router.get("/currentcy/:range", currentcyRange);

export default router;
