import { Request, Response } from "express";
import { IuserController } from "../interfaces/IuserController";
import { registerUserSchema } from "../validators/RegisterUserValidator";
import { CustomError } from "../errors/CustomError";
import { AuthService } from "../utils/jwt";
import { resetPasswordSchema } from "../validators/ResetPasswordValidation";
import IuserService from "interfaces/IuserService";

export class userController implements IuserController {
  private _userService: IuserService;

  constructor(_userService: IuserService) {
    this._userService = _userService;
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

       await this._userService.registersUser(name, email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
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
    } catch (error) {
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
            _id:user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            token: token,
            image:user.image,
            isOrganizationAdded:user.isOrganizationAdded,
            organizationId:user.organizationId,
            position:user.position
          },
        });
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
      
      const newAccessToken = await this._userService.refreshToken(refreshToken)
      console.log("newaccess",newAccessToken);
      
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
      if (error instanceof CustomError) {
        console.log("msg", error.message);
        return res.status(error.status).json({ error: error.message });
      } else {
        console.log(error);
        return res.status(400).json({ error: error });
      }
    }
  };


  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fName, lName, phone, email ,image} = req.body;
      
      
      const user = await this._userService.updateProfile(fName, lName, phone, email,image);
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
  
  public googleLogin = async(req: Request, res: Response): Promise<Response>=> {
    try {
      const { email, name, picture, sub } = req.body;
    
      if (!email || !sub) {
         res.status(400).json({ error: "Invalid Google data." });
      }  
        const user = await this._userService.googleLogin(
          email,
          name,
          sub,
          picture,
        );
  
      console.log(user,'fro controller');
      if(user){
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
            _id:user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            token: token,
            image:user.image,
            isOrganizationAdded:user.isOrganizationAdded,
            organizationId:user.organizationId
          },
        });
      }
      return res.status(404).json({ error: "User not found." });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal server Errror" });
      }
      
    }
  }
   
  public fetchEmployeesId = async(req: Request, res: Response): Promise<void> =>{
    try {
      const {employeeIds} = req.query
      console.log("from emolyeecontroller",employeeIds);
      
      const employees = await this._userService.fetchEmployeesId(employeeIds as string[])
      res.status(200).json({message:"Employees fetched succesfuly",employees})
    } catch (error) {
      console.log(error);
      
    }
  }
  public getAllEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log("gte in allllll");

      const { organizationId,page,pageSize } = req.query;
      if (!organizationId) {
        throw new Error("organix=zation id is needed");
      }
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : undefined;
      const {employees,totalEmployees} = await this._userService.getAllEmployees(
        organizationId as string,pageNumber,pageSizeNumber
      );
      res.status(200).json({ message: "sucess", employees,totalEmployees });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Interval server error" });
    }
  };
  
}
