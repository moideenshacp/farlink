import express from "express";
import { authController } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();

const AuthController = new authController();

router.post("/register", AuthController.registerUser);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/login", AuthController.loginUser as any);
router.post("/logout", AuthController.logoutUser as any);
router.post("/forget-password", AuthController.forgetPassword);
router.post('/refresh-token', (AuthController.refreshToken as any));
router.post("/reset-password", AuthController.resetPassword as any);
router.post("/update-profile",(authenticate as any) , AuthController.updateProfile);
router.get("/get-profile",(authenticate as any), AuthController.getUserProfile);

export default router;
