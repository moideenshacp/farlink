import { ImeetDetails } from "../interfaces/ImeetDetails";
import ImeetModel from "../interfaces/ImeetModel";
import ImeetRepository from "../interfaces/ImeetRepository";
import meetModel from "../models/meetModel";
import BaseRepository from "./baseRepository";

export class meetRepository
  extends BaseRepository<ImeetModel>
  implements ImeetRepository
{
  constructor() {
    super(meetModel);
  }
  async createMeet(meetDetails: ImeetDetails): Promise<ImeetModel | null> {
    try {
      return await this.save(meetDetails);
    } catch (error) {
      console.error("Error creating meeting:", error);
      throw new Error("Failed to create meeting");
    }
  }
  

  
}
