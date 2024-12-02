import {
  CustomError,
  LoginUserError,
  LoginUserNotVerified,
  TokenError,
  userAlreadyverifed,
  UserExist,
  userNotFound,
} from "../errors/CustomError";
import IuserModel from "../interfaces/IuserModel";
import IuserService from "../interfaces/IauthService";
import { userRepository } from "../repositories/userRepository";
import { EmailService } from "../utils/emailVerify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";

export class authService implements IuserService {
  private _userRepository!: userRepository;

  constructor() {
    this._userRepository = new userRepository();
  }

  async registersUser(
    name: string,
    email: string,
    password: string
  ): Promise<IuserModel> {
    const existingUser = await this._userRepository.findByEmail(email);
    console.log("exist  user============", existingUser);

    if (existingUser?.verified) {
      throw new UserExist();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser && !existingUser.verified) {
      const updatedUser = await this._userRepository.update(
        { email },
        { name, password: hashedPassword, isActive: true }
      );
      if (updatedUser) {
        await EmailService.sendVerificationMail(updatedUser.email);
      }
      return updatedUser!;
    }

    const newUser: Partial<IuserModel> = {
      name,
      email,
      password: hashedPassword,
      isActive: true,
      verified: false,
    };

    const createdUser = await this._userRepository.createUser(newUser);
    await EmailService.sendVerificationMail(email);
    return createdUser!;
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      // Decode the token to extract the email
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const user = await this._userRepository.findByEmail(email);

      console.log("Found user:", user);

      if (!user) {
        throw new userNotFound();
      }

      if (user.verified) {
        console.log("User already verified");
        throw new userAlreadyverifed();
      }

      const updatedUser = await this._userRepository.update(
        { email },
        { verified: true }
      );

      console.log("User verified successfully:", updatedUser);
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        console.log("tttttttttttttt");
        throw new TokenError();
      }
      if (error instanceof CustomError) {
        console.log("bbbbbb");
        throw error;
      }
      throw new CustomError(500, "Internal Server Error");
    }
  }

  async loginUser(email: string, password: string): Promise<IuserModel> {
    const userExist = await this._userRepository.findByEmail(email);
    if (!userExist) {
      throw new LoginUserError();
    }
    if (userExist && userExist.verified === false) {
      throw new LoginUserNotVerified();
    }
    console.log("useerexistsss", userExist);

    const passwordMatch = bcrypt.compareSync(password, userExist.password);
    if (!passwordMatch) {
      throw new LoginUserError();
    }

    return userExist;
  }
}
