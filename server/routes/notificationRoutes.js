import express from "express";
import {
  createNotification,
  readedNotification,
  getAllNiotification,
  deleteNotification,
} from "../controllers/notificationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", verifyToken, getAllNiotification);
router.post("/create", verifyToken, createNotification);
router.put("/update", verifyToken, readedNotification);
router.post("/delete", verifyToken, deleteNotification);

export default router;
