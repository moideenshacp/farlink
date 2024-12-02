import { Request, Response } from "express";
import { IauthController } from "../interfaces/IauthController";
import { authService } from "../services/authService";
import { registerUserSchema } from "../validators/RegisterUserValidator";
import { CustomError } from "../errors/CustomError";
import { AuthService } from "../utils/jwt";

export class authController implements IauthController {
  private _authService: authService;

  constructor() {
    this._authService = new authService();
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

      const user = await this._authService.registersUser(name, email, password);
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

      await this._authService.verifyEmail(token as string);
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
  }

  public loginUser = async (req: Request, res: Response):Promise<Response>=>{
    try {
        const { email, password } = req.body;
    
        console.log("body",email);
        if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required." });
          
        }
        

        const user = await this._authService.loginUser(email,password)
    
        const token = AuthService.generateToken(user);
        console.log("token====",token);
        
    
        res.cookie("accessToken", token, { httpOnly: true,sameSite:"strict", maxAge: 3600});
    
        return res.status(200).json({ message: "Login sucessfull" ,user:{email:user.email,role:user.role,name:user.name}});
      } catch (error: any) {
        if (error instanceof CustomError) {
          return res.status(error.status).json({ error: error.message });
        } else {
          return res.status(500).json({ error: "Internal server Errror" });
        }
      }
       
  }
}