import express from "express";
import {
  createNotification,
  readedNotification,
  getAllNotification,
  deleteNotification,
} from "../controllers/notificationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", verifyToken, getAllNotification);
router.post("/create", verifyToken, createNotification);
router.put(
  "/update/:notificationId",
  verifyToken,
  readedNotification
);
router.post("/delete", verifyToken, deleteNotification);

export default router;
