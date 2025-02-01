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
  async fetchMeet(organizationId: string): Promise<ImeetModel[] | null> {
    try {
      const meetings = this.model.find({ organizationId });
      return meetings;
    } catch (error) {
      console.log("Error creating meeting:", error);
      throw error;
    }
  }
  async editMeet(
    meetId: string,
    meetDetails: ImeetDetails
  ): Promise<ImeetModel | null> {
    try {
      const updatedmeet = await this.model.findByIdAndUpdate(
        meetId,
        { $set: meetDetails },
        { new: true }
      );

      return updatedmeet;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }
  async deleteMeet(meetId: string): Promise<ImeetModel | null> {
    try {
      const deletedMeet = await this.model.findByIdAndDelete(meetId);
      return deletedMeet;
    } catch (error) {
      console.error("Error deleting meeting:", error);
      throw error;
    }
  }
  async fetchAllMeetsOfEmployee(
    employeeId: string
  ): Promise<ImeetModel[]> {
    try {
      const meets = await this.model.find({
        $or: [{ members: employeeId }],
      });
      return meets;
    } catch (error) {
      console.error("Error fetching employee's tasks:", error);
      throw error;
    }
  }
  
}
