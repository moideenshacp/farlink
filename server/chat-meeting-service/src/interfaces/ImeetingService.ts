import { ImeetDetails } from "./ImeetDetails";
import ImeetModel from "./ImeetModel";

export interface ImeetingService {
  createMeeting(meetDetails:ImeetDetails): Promise<ImeetModel | null>;
}
