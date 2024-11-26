import { User } from "../../core/entities/User";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import bcrypt from 'bcryptjs';

export class UserMapper {
  static toEntity(dto: RegisterUserDTO): User {
    if(!dto.email || !dto.name || !dto.password){
      throw new Error ("invalid data:missing required fields")
    }
    return {
      
      name: dto.name,
      email: dto.email,
      password: bcrypt.hashSync(dto.password, 10),
      role: dto.role,
      isActive: true,
      verified: false
    };
  }
}
