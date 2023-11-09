import express from "express";

import {
  createMessage,
  getMessage,
} from "../controllers/messageCotroller.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createMessage);
router.get("/:conversationId", verifyToken, getMessage);

export default router;
