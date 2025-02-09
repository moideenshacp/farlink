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
router.post("/logout", UserController.logoutUser);
router.post("/google-login", UserController.googleLogin);

//common===========================================================================================================
router.post("/login", UserController.loginUser);
router.post('/refresh-token', (UserController.refreshToken));
router.post("/forget-password", UserController.forgetPassword);
router.post("/reset-password", UserController.resetPassword);
router.patch("/update-profile",authenticate, UserController.updateProfile);
router.get("/get-profile",authenticate, UserController.getUserProfile);
router.get('/fetch-employeesById',authenticate,UserController.fetchEmployeesId)
router.get('/get-employees',authenticate,UserController.getAllEmployees)




//superAdmin========================================================================================================


export default router;
