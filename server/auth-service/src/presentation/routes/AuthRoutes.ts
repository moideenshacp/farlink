import express from "express";
import AuthController from "../controllers/AuthController";
    
const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/login", (AuthController.UserLoginHandle as any));

export default router;
