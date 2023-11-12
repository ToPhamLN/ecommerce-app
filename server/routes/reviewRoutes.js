import express from "express";

import {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getReview,
  likeReview,
} from "../controllers/reviewController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all/:productId", getAllReviews);
router.get("/:reviewId", getReview);
router.put("/like/:reviewId", verifyToken, likeReview);
router.post("/create", verifyToken, createReview);
router.put("/update/:reviewId", verifyToken, updateReview);
router.delete("/delete/:reviewId", verifyToken, deleteReview);

export default router;
