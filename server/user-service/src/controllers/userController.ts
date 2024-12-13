import { Request, Response } from "express";
import { IuserController } from "../interfaces/IuserController";
import { userService } from "../services/userService";
import { registerUserSchema } from "../validators/RegisterUserValidator";
import { CustomError } from "../errors/CustomError";
import { AuthService } from "../utils/jwt";
import { resetPasswordSchema } from "../validators/ResetPasswordValidation";

export class userController implements IuserController {
  private _userService: userService;

  constructor() {
    this._userService = new userService();
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = registerUserSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((err) => err.message);
        console.log(errorMessage);

        res.status(400).json({ errors: errorMessage });
        return;
      }
      const { name, email, password } = value;

      const user = await this._userService.registersUser(name, email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
        console.log("msg", error.message);
      } else {
        res.status(400).json({ error: error });
        console.log(error);
      }
    }
  };

  public verifyEmail = async (req: Request, res: Response) => {
    try {
      const { token } = req.query;

      await this._userService.verifyEmail(token as string);
      res
        .status(200)
        .json({ status: "success", message: "Email successfully verified." });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server Errror" });
      }
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      console.log("body", email);
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required." });
      }

      const user = await this._userService.loginUser(email, password);

      const token = AuthService.generateToken({ email: user.email, role: user.role });
      const refreshToken = AuthService.generateRefreshToken({ email: user.email, role: user.role });
      console.log("token====", token);

      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge:  60  * 60 * 1000,
        
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({
          message: "Login sucessfull",
          user: {
            email: user.email,
            role: user.role,
            name: user.name,
            token: token,
            isOrganizationAdded:user.isOrganizationAdded
          },
        });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal server Errror" });
      }
    }
  };

  public logoutUser = async (req: Request, res: Response) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict"
      });

      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server Errror" });
    }
  };

  public forgetPassword = async (req: Request, res: Response) => {
    try {

      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      await this._userService.generatePasswordResetToken(email);
      res
        .status(200)
        .json({ message: "Password reset link sent successfully" });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
        console.log("msg", error.message);
      } else {
        res.status(400).json({ error: error });
        console.log(error);
      }
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { error, value } = resetPasswordSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errorMessage = error.details.map((err) => err.message);
        console.error("Validation errors:", errorMessage);
        return res.status(400).json({ errors: errorMessage });
      }

      const { password, token } = value;

      await this._userService.resetPassword(password, token);
      return res.status(201).json({ message: "Password updated successfully" });
    } catch (error: any) {
      if (error instanceof CustomError) {
        console.log("msg", error.message);
        return res.status(error.status).json({ error: error.message });
      } else {
        console.log(error);
        return res.status(400).json({ error: error });
      }
    }
  };
  public refreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("coming ot create refrsh token");
      
      const refreshToken = req.cookies.refreshToken;
      console.log("refresh token----------------",refreshToken);
      
  
      if (!refreshToken) {
        console.log("1010====================================================");
        
        return res.status(401).json({ error: "Refresh token is required" });
      }
  
      const decoded = AuthService.verifyRefreshToken(refreshToken);
      if (!decoded) {
        console.log("2020===============================");
        
        return res.status(403).json({ error: "Invalid or expired refresh token" });
      }
   
      const newAccessToken = AuthService.generateToken({
        email: decoded.email,
        role: decoded.role,
      });
  
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour 
      });
  
      return res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fName, lName, phone, email } = req.body;
      
      
      const user = await this._userService.updateProfile(fName, lName, phone, email);
      if (user) {
        res.status(200).json({ 
          message: "Profile updated successfully",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
          }
        });
      }
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ 
        message: "An error occurred while updating the profile" 
      });
    }
  };

  public getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.query;
  
      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      const userProfile = await this._userService.getUserProfile(email  as string);
      if (!userProfile) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "Profile fetched successfully",  userProfile });
    } catch (error) {
      console.log( error);
      res.status(500).json({ message: "An error occurred while fetching the profile" });
    }
  };
  
  
   

  
}
