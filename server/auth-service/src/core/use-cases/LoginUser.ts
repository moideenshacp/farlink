import { LoginUserDTO } from "../../application/dtos/LoginUserDTO";
import { User } from "../entities/User";
import { LoginUserError, LoginUserNotVerified } from "../errors/CustomError";
import { UserRepository } from "../interfaces/UserRepository";
import bcrpyt from 'bcryptjs'

export class LoginUser{
    constructor (private userRepository:UserRepository){}

    async execute(dto:LoginUserDTO):Promise<User>{
        const userExist = await this.userRepository.findByEmail(dto.email)  
        console.log("user exist0",userExist);
              

        if(!userExist){
            throw new LoginUserError()
        }
        if(userExist && userExist.verified === false){
            throw new LoginUserNotVerified()

        }

        const passwordMatch = bcrpyt.compareSync(dto.password,userExist.password)
        if(!passwordMatch){
            throw new LoginUserError()
        }

        return userExist
    }
}