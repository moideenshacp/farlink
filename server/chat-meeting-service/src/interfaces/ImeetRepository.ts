import { ImeetDetails } from "./ImeetDetails";
import ImeetModel from "./ImeetModel";


export default interface ImeetRepository {
  createMeet(meetDetails: ImeetDetails): Promise<ImeetModel | null>;

}
