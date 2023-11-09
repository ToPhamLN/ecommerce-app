import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  destroy,
  getAllUser,
  getProfile,
  getUser,
  postLogin,
  postLogout,
  postRefresh,
  postRegister,
  searchUser,
  updateAuth,
  updateAvatar,
} from "./../controllers/userController.js";
import uploadCloud from "../middlewares/uploader.js";

const router = express.Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/profile", verifyToken, getProfile);
router.put("/auth", verifyToken, updateAuth);
router.put(
  "/avatar",
  verifyToken,
  uploadCloud.single("avatar"),
  updateAvatar
);
router.get("/search", verifyToken, searchUser);
router.delete("/delete", verifyToken, destroy);
router.post("/logout", postLogout);
router.post("/refresh", postRefresh);
router.get("/all", verifyToken, getAllUser);
router.get("/:slug", verifyToken, getUser);

export default router;
