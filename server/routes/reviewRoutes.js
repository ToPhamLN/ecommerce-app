import express from "express";

import {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/reviewController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.put("/update/:reviewId", verifyToken, updateReview);
router.delete("/delete/:reviewId", verifyToken, deleteReview);
router.get("/all/:productId", getAllReviews);

export default router;
