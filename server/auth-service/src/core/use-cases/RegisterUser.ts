// src/core/use-cases/RegisterUser.ts
import { UserRepository } from "../interfaces/UserRepository";
import { User } from "../entities/User";
import { RegisterUserDTO } from "../../application/dtos/RegisterUserDTO";
import { EmailService } from "../../application/services/EmailService";

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new Error("User already exists");

    const user: User = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
      isActive: true,
      verified: false
    };

    const createdUser =  await this.userRepository.create(user);


    await EmailService.sendVerificationMail(user.email)

    return createdUser
  }
}
