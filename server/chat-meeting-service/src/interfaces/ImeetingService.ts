import { ImeetDetails } from "./ImeetDetails";
import ImeetModel from "./ImeetModel";

export interface ImeetingService {
  createMeeting(meetDetails:ImeetDetails): Promise<ImeetModel | null>;
  fetchMeeting(organizationId:string): Promise<ImeetModel[] | null>;
  editMeeting(meetId:string,meetDetails:ImeetDetails): Promise<ImeetModel | null>;
  deleteMeeting(meetId:string): Promise<ImeetModel | null>;
  fetchAllMeetsOfEmployee(employeeId:string): Promise<ImeetModel[] | null>;
//   joinMeeting(meetId: string, userId: string): Promise<ImeetModel | null>
}
