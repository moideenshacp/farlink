import { Request, Response } from "express";
import { RegisterUser } from "../../core/use-cases/RegisterUser";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { UserMapper } from "../../application/mappers/UserMapper";
import { AuthService } from "../../application/services/AuthService";
import { VerifyEmail } from "../../core/use-cases/Verify-Email";

const registerUser = async (req: Request, res: Response) => {
  try {
    const userRepo = new MongoUserRepository();
    const useCase = new RegisterUser(userRepo);
    const userDto = req.body;

    const userEntity = UserMapper.toEntity(userDto);
    const user = await useCase.execute(userEntity);

    const token = AuthService.generateToken(user);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};


const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    const userRepo = new MongoUserRepository();
    const useCase = new VerifyEmail(userRepo);

    await useCase.execute(token as string);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error:any) {
    res.status(400).json({ error: error });
  }
};
export default { registerUser,verifyEmail };
