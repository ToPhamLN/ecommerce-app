import express from "express";
import {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getAllFeedback,
} from "../controllers/feedbackController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createFeedback);
router.get("/all", verifyToken, getAllFeedback);
router.get("/:feedbackId", verifyToken, getFeedback);
router.put("/update/:feedbackId", verifyToken, updateFeedback);
router.delete(
  "/delete/:feedbackId",
  verifyToken,
  deleteFeedback
);

export default router;
