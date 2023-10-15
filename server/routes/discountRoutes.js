import express from "express";
import {
  getAllDiscount,
  getDiscount,
  getDiscountId,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  useDiscount,
} from "../controllers/discountController.js";

const router = express.Router();

router.get("/all", getAllDiscount);
router.post("/create", createDiscount);
router.get("/code", getDiscount);
router.get("/:discountId", getDiscountId);
router.put("/update/:discountId", updateDiscount);
router.put("/usecode/:discountId", useDiscount);
router.delete("/delete/:discountId", deleteDiscount);
export default router;
