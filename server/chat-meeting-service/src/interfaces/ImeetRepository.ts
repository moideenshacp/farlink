import { ImeetDetails } from "./ImeetDetails";
import ImeetModel from "./ImeetModel";


export default interface ImeetRepository {
  createMeet(meetDetails: ImeetDetails): Promise<ImeetModel | null>;
  fetchMeet(organizationId: string): Promise<ImeetModel[] | null>;
  editMeet(meetId: string,meetDetails:ImeetDetails): Promise<ImeetModel | null>;
  deleteMeet(meetId: string): Promise<ImeetModel | null>
  fetchAllMeetsOfEmployee(
      employeeId: string
    ): Promise<ImeetModel[]>

}
