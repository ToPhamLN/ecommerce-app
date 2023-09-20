import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getAllOrder);
router.get(":/orderId", getOrder);
router.put("/update/:orderId", updateOrder);
router.delete("/delete/:orderId", deleteOrder);

export default router;
