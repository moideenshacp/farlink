import express from "express";
import { authController } from "../controllers/authController";
const router = express.Router();

const AuthController = new authController();

router.post("/register", AuthController.registerUser);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/login", AuthController.loginUser as any);
router.post("/logout", AuthController.logoutUser as any);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword as any);
router.post("/update-profile", AuthController.updateProfile);
router.post("/get-profile", AuthController.getUserProfile);

export default router;
