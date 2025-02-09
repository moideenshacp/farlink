import { IattendencePolicy } from "./IattendencePolicy";
import { IattendanceSummary } from "./IattendenceSummary";

export interface IattendenceService {
  UpdateAttendencePolicy(
    policy: IattendencePolicy,
    organizationId: string
  ): Promise<IattendencePolicy | null>;
  getAttendencePolicy(
    organizationId: string
  ): Promise<IattendencePolicy | null>;
  handleAttendence(organizationId: string,employeeEmail:string):Promise<void>
  getAttendenceReport(employeeEmail:string):Promise<IattendanceSummary[] | null>
  markAbsentees(organizationId: string): Promise<void>;
  editAttendance(
    attendenceId: string,
    checkIn: string, 
    checkOut: string 
  ): Promise<void>

}
