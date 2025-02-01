import { CustomError } from "../errors/CustomError";
import { ImeetDetails } from "../interfaces/ImeetDetails";
import { ImeetingService } from "../interfaces/ImeetingService";
import ImeetModel from "../interfaces/ImeetModel";
import ImeetRepository from "../interfaces/ImeetRepository";
import generateRandomId from "../utils/generateMeetId";

export class meetService implements ImeetingService {
  private _meetRepository: ImeetRepository;

  constructor(_meetRepository: ImeetRepository) {
    this._meetRepository = _meetRepository;
  }

  async createMeeting(meetDetails: ImeetDetails): Promise<ImeetModel | null> {
    try {
      const currentDate = new Date();
      console.log("meetdetails", meetDetails);
      if (!meetDetails.meetTitle.trim()) {
        throw new CustomError("Please enter a valid Title", 400);
      }
      if (!meetDetails.meetTime.trim().match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
        throw new CustomError("Please enter a valid Time in HH:mm format", 400);
      }
      if (meetDetails.members.length === 0) {
        throw new CustomError("Please choose at least one member", 400);
      }
      const meetingDate = new Date(meetDetails.meetDate);
      if (meetingDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        throw new CustomError("Please select a valid future date", 400);
      }
      if (meetingDate.toDateString() === currentDate.toDateString()) {
        const [meetHours, meetMinutes] = meetDetails.meetTime
          .split(":")
          .map(Number);
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        if (
          meetHours < currentHours ||
          (meetHours === currentHours && meetMinutes <= currentMinutes)
        ) {
          throw new CustomError(
            "Please select a future time for today's meeting",
            400
          );
        }
      }
      const meetId = generateRandomId(10)
      meetDetails.meetId = meetId
      const meeting = await this._meetRepository.createMeet(meetDetails);
      if (meeting) {
        return meeting;
      }

      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchMeeting(organizationId: string): Promise<ImeetModel[] | null> {
    try {
      console.log("fetch meting",organizationId);
      const meetings = await this._meetRepository.fetchMeet(organizationId)
      if (meetings) {
        const sortedMeetings = meetings.sort((a, b) => {
          const meetingA = new Date(`${a.meetDate}`);
          const meetingB = new Date(`${b.meetDate}`);
          
          return meetingB.getTime() - meetingA.getTime();
        });
        console.log(sortedMeetings,"meettss");
        
        return sortedMeetings;
      }
      return null
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }
  async editMeeting(meetId: string, meetDetails: ImeetDetails): Promise<ImeetModel | null> {
    try {
      const updatedMeet = await this._meetRepository.editMeet(meetId,meetDetails)
      if(updatedMeet){
        return updatedMeet
      }
      return null
    } catch (error) {
      console.log(error);
      throw error
    }
  }
  async deleteMeeting(meetId: string): Promise<ImeetModel | null> {
    try {

      const deleteMeet = await this._meetRepository.deleteMeet(meetId)
      return deleteMeet
      
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }
  async fetchAllMeetsOfEmployee(employeeId: string): Promise<ImeetModel[] | null> {
    try {
      const meetings = await this._meetRepository.fetchAllMeetsOfEmployee(employeeId)
      if (meetings) {
        const sortedMeetings = meetings.sort((a, b) => {
          const meetingA = new Date(`${a.meetDate}`);
          const meetingB = new Date(`${b.meetDate}`);
          
          return meetingB.getTime() - meetingA.getTime();
        });
        console.log(sortedMeetings,"meettss emplyees");
        
        return sortedMeetings;
      }
      return null
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
}
