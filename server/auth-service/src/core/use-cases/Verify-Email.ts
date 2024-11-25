// src/core/use-cases/VerifyEmail.ts
import jwt from "jsonwebtoken";
import { UserRepository } from "../interfaces/UserRepository";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email_secret_key";

export class VerifyEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<void> {
    try {
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const user = await this.userRepository.findByEmail(email);

      console.log('verify email:',user);
      
      if (!user) throw new Error("User not found");

      if (user.verified) throw new Error("User is already verified");

      user.verified = true;
      await this.userRepository.create(user);
    } catch (error:any) {
      throw new Error("Invalid or expired token");
    }
  }
}
