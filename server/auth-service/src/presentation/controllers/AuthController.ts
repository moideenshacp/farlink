import { Request, Response } from "express";
import { RegisterUser } from "../../core/use-cases/RegisterUser";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { UserMapper } from "../../application/mappers/UserMapper";
import { AuthService } from "../../application/services/AuthService";
import { VerifyEmail } from "../../core/use-cases/Verify-Email";
import { registerUserSchema } from "../../application/validators/RegisterUserValidator";
import { CustomError } from "../../core/errors/CustomError";
import { LoginUser } from "../../core/use-cases/LoginUser";

const registerUser = async (req: Request, res: Response) => {
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
    const userRepo = new MongoUserRepository();
    const useCase = new RegisterUser(userRepo);
    console.log("req", req.body);

    const userEntity = UserMapper.toEntity(value);
    const user = await useCase.execute(userEntity);

    console.log("user registered");

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

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    const userRepo = new MongoUserRepository();
    const useCase = new VerifyEmail(userRepo);

    await useCase.execute(token as string);

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

const UserLoginHandle = async (req: Request, res: Response) =>  {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const userRepo = new MongoUserRepository();
    const useCase = new LoginUser(userRepo);

    const user = await useCase.execute({email,password});

    const token = AuthService.generateToken(user);

    res.cookie("auth_token", token, { httpOnly: true, maxAge: 3600 });

    res.status(200).json({ message: "Login sucessfull" ,token});
  } catch (error: any) {
    if (error instanceof CustomError) {
       res.status(error.status).json({ error: error.message });
    }
  }
};

export default { registerUser, verifyEmail, UserLoginHandle };
