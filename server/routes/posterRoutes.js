import express from "express";
import uploadCloud from "../middlewares/uploader.js";
import { verifyTokenAndAuthAdmin } from "../middlewares/authMiddleware.js";
import {
  createPoster,
  updatePoster,
  getAllPoster,
  getPoster,
  deletePoster,
} from "../controllers/posterController.js";

const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthAdmin,
  uploadCloud.single("picture"),
  createPoster
);
router.get("/all", getAllPoster);
router.get("/:posterId", getPoster);
router.put(
  "/update/:posterId",
  verifyTokenAndAuthAdmin,
  uploadCloud.single("picture"),
  updatePoster
);
router.delete(
  "/delete/:posterId",
  verifyTokenAndAuthAdmin,
  deletePoster
);

export default router;
