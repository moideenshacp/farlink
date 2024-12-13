import express from "express";
import { userController } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();

const UserController = new userController();
//admin===========================================================================================================
router.post("/register", UserController.registerUser);
router.post("/verify-email", UserController.verifyEmail);
router.post("/logout", UserController.logoutUser as any);

//common===========================================================================================================
router.post("/login", UserController.loginUser as any);
router.post('/refresh-token', (UserController.refreshToken as any));
router.post("/forget-password", UserController.forgetPassword);
router.post("/reset-password", UserController.resetPassword as any);
router.post("/update-profile",(authenticate as any) , UserController.updateProfile);
router.get("/get-profile",(authenticate as any), UserController.getUserProfile);


//superAdmin========================================================================================================


export default router;
