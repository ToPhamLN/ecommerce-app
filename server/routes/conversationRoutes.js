import express from "express";

import {
  getAllConversation,
  createConversation,
  deleteConversation,
} from "../controllers/conversationController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createConversation);
router.get("/all", verifyToken, getAllConversation);
router.delete("/delete", verifyToken, deleteConversation);

export default router;
