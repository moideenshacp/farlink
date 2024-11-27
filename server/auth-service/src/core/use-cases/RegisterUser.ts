// src/core/use-cases/RegisterUser.ts
import { UserRepository } from "../interfaces/UserRepository";
import { User } from "../entities/User";
import { RegisterUserDTO } from "../../application/dtos/RegisterUserDTO";
import { EmailService } from "../../application/services/EmailService";
import {  UserExist } from "../errors/CustomError";

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    console.log("exist  user verified============",existingUser?.verified);
    console.log("exist  user============",existingUser);
    console.log("status",existingUser?.verified === true);
    
    if (existingUser?.verified === true){
      throw new UserExist()
    }

    if(existingUser && existingUser.verified === false){
      const updatedUser = await this.userRepository.update(existingUser.email,{
        name:dto.name,
        email:dto.email,
        password:dto.password,
        role:dto.role,
        isActive:true
      })
      await EmailService.sendVerificationMail(updatedUser.email)
      return updatedUser

    }

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
