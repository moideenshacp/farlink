import mongoose, { FilterQuery } from "mongoose";
import IAttendancePolicy from "./IpolicyModel"

export default interface IpolicyRepo {
  createPolicy(policyData: Partial<IAttendancePolicy>): Promise<IAttendancePolicy | null>;

  updatePolicy(
    filter: FilterQuery<IAttendancePolicy>,
    update: Partial<IAttendancePolicy>
  ): Promise<IAttendancePolicy | null>;
  findByOrganizationId(
    organizationId: mongoose.Types.ObjectId
  ): Promise<IAttendancePolicy | null>;
}
