import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  currencyRange,
  statOrders,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, getAllOrder);
router.get("/:orderId", verifyToken, getOrder);
router.put("/update/:orderId", verifyToken, updateOrder);
router.delete("/delete/:orderId", verifyToken, deleteOrder);

router.get("/currency/:range", currencyRange);
router.get("/stats/:period", statOrders);

export default router;
