import { UserRepository } from "../../core/interfaces/UserRepository";
import { User } from "../../core/entities/User";
import UserModel from "../database/models/UserModel";

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = new UserModel(user);
    await createdUser.save();
    return createdUser.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email }).exec();
  }
  async update(email: string, updates: Partial<User>): Promise<User> {
    const updatedUser  = await UserModel.findOneAndUpdate(
      {email},
      {$set:updates},
      {new:true}
    ).exec()
    
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser?.toObject()
  }
}
