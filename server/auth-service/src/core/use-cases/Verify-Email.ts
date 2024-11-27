// src/core/use-cases/VerifyEmail.ts
import jwt from "jsonwebtoken";
import { UserRepository } from "../interfaces/UserRepository";
import { CustomError, TokenError, userAlreadyverifed, userNotFound } from "../errors/CustomError";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";

export class VerifyEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<void> {
    try {
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const user = await this.userRepository.findByEmail(email);

      console.log('find userr',user);
      
      if (!user) {
        throw new userNotFound()
      }
      
      if (user.verified){
        console.log('already verified')
        throw new userAlreadyverifed()
      }
      
      user.verified = true;
      await this.userRepository.create(user);

      console.log('user verified:',user);
    }catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        throw new TokenError();
      }
      throw new CustomError(500, "Internal server Error");
    }
    
  }
}
