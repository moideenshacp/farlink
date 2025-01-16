import express from "express";
import { userController } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import IuserRepo from "interfaces/IuserRepository";
import { userRepository } from "../repositories/userRepository"
import IuserService from "interfaces/IuserService";
import { userService } from "../services/userService";
import { IuserController } from "interfaces/IuserController";
const router = express.Router();

const UserRepository:IuserRepo = new userRepository()
const UserService :IuserService = new userService(UserRepository)
const UserController:IuserController = new userController(UserService);
//admin===========================================================================================================
router.post("/register", UserController.registerUser);
router.post("/verify-email", UserController.verifyEmail);
router.post("/logout", UserController.logoutUser as never);
router.post("/google-login", UserController.googleLogin as never);

//common===========================================================================================================
router.post("/login", UserController.loginUser as never);
router.post('/refresh-token', (UserController.refreshToken as never));
router.post("/forget-password", UserController.forgetPassword);
router.post("/reset-password", UserController.resetPassword as never);
router.post("/update-profile",authenticate, UserController.updateProfile);
router.get("/get-profile",authenticate, UserController.getUserProfile);


//superAdmin========================================================================================================


export default router;
