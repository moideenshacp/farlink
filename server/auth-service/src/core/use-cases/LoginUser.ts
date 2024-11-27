import { LoginUserDTO } from "../../application/dtos/LoginUserDTO";
import { User } from "../entities/User";
import { LoginUserError } from "../errors/CustomError";
import { UserRepository } from "../interfaces/UserRepository";
import bcrpyt from 'bcryptjs'

export class LoginUser{
    constructor (private userRepository:UserRepository){}

    async execute(dto:LoginUserDTO):Promise<User>{
        const userExist = await this.userRepository.findByEmail(dto.email)        

        if(!userExist){
            throw new LoginUserError()
        }

        const passwordMatch = bcrpyt.compareSync(dto.password,userExist.password)
        if(!passwordMatch){
            throw new LoginUserError()
        }

        return userExist
    }
}