/* eslint-disable @typescript-eslint/no-explicit-any */
import { AttendancePolicyRepository } from "../repositories/policyRepository";
import { AttendanceRepository } from "../repositories/attendenceRepo";

import { IleaveService } from "../interfaces/IleaveService";
import { leaveRepository } from "../repositories/leaveRepository";
import { CustomError } from "../errors/CustomError";
import IleaveModel from "../interfaces/IleaveModel";

export class leaveService implements IleaveService {
  private _policyRepository: AttendancePolicyRepository;
  private _attendenceRepository: AttendanceRepository;
  private _leaveRepository: leaveRepository;

  constructor() {
    this._policyRepository = new AttendancePolicyRepository();
    this._attendenceRepository = new AttendanceRepository();
    this._leaveRepository = new leaveRepository();
  }

  async handleLeaveApplication(data: any): Promise<IleaveModel | null> {
    try {
      console.log(data, "data");

      const policy = await this._policyRepository.findByOrganizationId(
        data.organizationId
      );
      console.log("Policy fetched:", policy);

      const leaveType = data.formData.leaveType;
      if (policy) {
        if (!policy.leaveType || !(leaveType in policy.leaveType)) {
          throw new Error(`Invalid leave type: ${leaveType}`);
        }

        const currentMonth = new Date(data.formData.fromDate).getMonth() + 1;
        const currentYear = new Date(data.formData.fromDate).getFullYear();

        const leavesTakenThisMonth =
          await this._leaveRepository.getLeavesTakenInMonth(
            data.organizationId,
            data.employeeEmail,
            leaveType,
            currentMonth,
            currentYear
          );
        console.log(
          `Leaves taken this month for ${leaveType}:`,
          leavesTakenThisMonth
        );

        const allowedLeaves = Number(
          policy.leaveType[leaveType as keyof typeof policy.leaveType]
        );
        console.log(`Allowed leaves for ${leaveType}:`, allowedLeaves);

        const startDate = new Date(data.formData.fromDate);
        const endDate = new Date(data.formData.toDate);

        const requestedDays =
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          ) + 1;

        if (leavesTakenThisMonth + requestedDays > allowedLeaves) {
          throw new CustomError(
            `Insufficient leave balance for ${leaveType} in the current month.`,
            400
          );
        }

        const leaveData = {
          organizationId: data.organizationId,
          employeeEmail: data.employeeEmail,
          leaveType,
          startDate,
          endDate,
          reason: data.formData.reason,
        };

        const savedLeave = await this._leaveRepository.createleave(leaveData);
        return savedLeave;
      }
      return null;
    } catch (error) {
      console.error("Error handling leave application:", error);
      throw error;
    }
  }
  async fetchAppliedLeaves(
    employeeEmail: string
  ): Promise<IleaveModel[] | null> {
    try {
      const fetchLeave = await this._leaveRepository.findByEmail(employeeEmail);
      if (fetchLeave) {
        const sortedLeaves = fetchLeave.sort((a, b) => {
          const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
          const dateB = b.startDate ? new Date(b.startDate) : new Date(0);

          return  dateB.getTime() - dateA.getTime() ;
        });
        return sortedLeaves;
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async ManageAppliedLeaves(leaveId: string,status: "pending" | "approved" | "rejected"): Promise<IleaveModel | null> {
    try {

      const updated  = await this._leaveRepository.updateStatus({_id:leaveId},{status:status})      
      if(updated){
        return updated
      }
      return null
    } catch (error) {
      console.log(error);
      return null
      
    }
  }
}
