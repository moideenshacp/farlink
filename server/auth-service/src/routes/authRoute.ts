import express from "express";    
import { authController } from "../controllers/authController";
const router = express.Router();

const AuthController = new authController()

router.post("/register", AuthController.registerUser);
router.post("/verify-email",AuthController.verifyEmail)
router.post("/login",(AuthController.loginUser as any))


export default router;
