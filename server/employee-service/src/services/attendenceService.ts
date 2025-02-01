import mongoose from "mongoose";
import { IattendencePolicy } from "../interfaces/IattendencePolicy";
import { IattendenceService } from "../interfaces/IattendenceService";
import IAttendancePolicyModel from "../interfaces/IpolicyModel";
import { DateTime } from "luxon";
import { IattendanceSummary } from "../interfaces/IattendenceSummary";
import { CustomError } from "../errors/CustomError";
import IpolicyRepo from "../interfaces/IpolicyRepo";
import IattendenceRepo from "../interfaces/IattendenceRepo";
import IemployeeRepo from "../interfaces/IemployeeRepository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToIST(date: any) {
  if (!date) return "N/A";

  return DateTime.fromISO(date.toISOString())
    .setZone("Asia/Kolkata")
    .toFormat("yyyy-MM-dd HH:mm:ss");
}

export class attendenceService implements IattendenceService {
  private _policyRepository: IpolicyRepo;
  private _attendenceRepository: IattendenceRepo;
  private _employeeRepository: IemployeeRepo;

  constructor(
    _policyRepository: IpolicyRepo,
    _attendenceRepository: IattendenceRepo,
    _employeeRepository: IemployeeRepo
  ) {
    this._policyRepository = _policyRepository;
    this._attendenceRepository = _attendenceRepository;
    this._employeeRepository = _employeeRepository;
  }

  async UpdateAttendencePolicy(
    policy: Partial<IattendencePolicy>,
    organizationId: string
  ): Promise<IattendencePolicy | null> {
    try {
      console.log("Fetching policy for organizationId:", policy);

      const organizationObjectId = new mongoose.Types.ObjectId(organizationId);

      let existingPolicy: IAttendancePolicyModel | null;
      existingPolicy = await this._policyRepository.findByOrganizationId(
        organizationObjectId
      );
      console.log("Existing policy:", existingPolicy);

      if (!existingPolicy) {
        console.log("Policy does not exist. Creating new policy.");
        existingPolicy = await this._policyRepository.createPolicy({
          ...policy,
          organizationId: organizationObjectId,
        });
      } else {
        console.log("Policy exists. Updating policy.");
        existingPolicy = await this._policyRepository.updatePolicy(
          { organizationId: organizationObjectId },
          policy
        );
      }

      console.log("Final policy:", existingPolicy);
      return existingPolicy;
    } catch (error) {
      console.error("Error updating attendance policy:", error);
      return null;
    }
  }
  async getAttendencePolicy(
    organizationId: string
  ): Promise<IattendencePolicy | null> {
    try {
      const organizationObjectId = new mongoose.Types.ObjectId(organizationId);
      const findPolicy = await this._policyRepository.findByOrganizationId(
        organizationObjectId
      );
      if (findPolicy) {
        return findPolicy;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async handleAttendence(
    organizationId: string,
    employeeEmail: string
  ): Promise<void> {
    try {
      const policy = await this.getAttendencePolicy(organizationId);
      if (!policy) throw new Error("Attendance policy not found");

      const currentTime = new Date();
      const currentTimeIST = new Date(
        DateTime.fromJSDate(currentTime).setZone("Asia/Kolkata").toISO() ||
          currentTime.toISOString()
      );
      const dayOfWeek = currentTimeIST.getDay();
      console.log("daaayyyyyy", dayOfWeek);

      if (dayOfWeek == 0 ) {
        throw new CustomError("Attendance cannot be marked on weekends.", 400);
      }

      const officeStartTimeIST = new Date(
        `${currentTimeIST.toDateString()} ${policy.officeStartTime}`
      );

      const officeEndTimeIST = new Date(
        `${currentTimeIST.toDateString()} ${policy.officeEndTime}`
      );

      const lateMarkAfterMinutes = Number(policy.lateMarkAfterMinutes);
      if (isNaN(lateMarkAfterMinutes)) {
        throw new Error("Invalid late mark threshold in attendance policy");
      }

      const lateMarkThresholdIST = new Date(
        officeStartTimeIST.getTime() + lateMarkAfterMinutes * 60000
      );
      console.log("policy.halfday after", policy.halfDayAfterHours);

      const halfDayThresholdHours =
        typeof policy.halfDayAfterHours === "number"
          ? policy.halfDayAfterHours
          : 0;

      console.log("halfDayThresholdHours", halfDayThresholdHours);

      const totalWorkingHoursRequired =
        typeof policy.totalWorkingHours === "number"
          ? policy.totalWorkingHours
          : 0;

      const recentAttendance =
        await this._attendenceRepository.findAttendanceByDate(
          organizationId,
          employeeEmail,
          new Date()
        );

      if (recentAttendance) {
        if (!recentAttendance.checkOut) {
          recentAttendance.checkOut = currentTimeIST;
          if (recentAttendance.checkIn) {
            const workingHours =
              (currentTimeIST.getTime() - recentAttendance.checkIn.getTime()) /
              3600000;
            console.log("workingHours", workingHours);

            recentAttendance.workingHours = workingHours;

            if (workingHours < halfDayThresholdHours) {
              recentAttendance.status = "halfDay";
            } else if (workingHours >= totalWorkingHoursRequired) {
              recentAttendance.status = "present";
            } else {
              recentAttendance.status = "late";
            }
          }

          await this._attendenceRepository.updateAttendance(
            { _id: recentAttendance._id },
            recentAttendance
          );
          console.log("Checked out successfully", recentAttendance);
        } else {
          console.log(
            "You have already completed your attendance for the day."
          );
          throw new CustomError(
            "You have already completed your attendance for the day.",
            400
          );
        }
      } else {
        let status: "late" | "present" | "absent" = "absent";

        if (currentTimeIST > officeEndTimeIST) {
          status = "absent";
          throw new CustomError(
            "Office time has ended, check-in is not allowed.",
            400
          );
        } else if (currentTimeIST > lateMarkThresholdIST) {
          status = "late";
        } else {
          status = "present";
        }

        const attendanceData = {
          organizationId: new mongoose.Types.ObjectId(organizationId),
          employeeEmail,
          checkIn: currentTimeIST,
          status,
        };

        await this._attendenceRepository.createattendence(attendanceData);
        console.log("Checked in successfully");
      }
    } catch (error: unknown) {
      console.error("Error handling attendance:", error);
      throw error;
    }
  }
  async getAttendenceReport(
    employeeEmail: string
  ): Promise<IattendanceSummary[] | null> {
    try {
      const attendanceData =
        await this._attendenceRepository.findAllByEmployeeEmail(employeeEmail);

      console.log("attendanceData", attendanceData);

      if (!attendanceData || attendanceData.length === 0) {
        console.log("No attendance data found for employee:", employeeEmail);
        return null;
      }

      const attendanceSummary: IattendanceSummary[] = attendanceData.map(
        (attendance) => {
          const checkInDate = attendance.checkIn
            ? convertToIST(attendance.checkIn).split(" ")[0]
            : convertToIST(attendance.date).split(" ")[0];
          const checkInTime = attendance.checkIn
            ? convertToIST(attendance.checkIn).split(" ")[1]
            : "N/A";
          const checkOutTime = attendance.checkOut
            ? convertToIST(attendance.checkOut).split(" ")[1]
            : "N/A";

          return {
            date: checkInDate,
            checkIn: checkInTime,
            checkOut: checkOutTime,
            status: attendance.status,
          };
        }
      );
      attendanceSummary.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA; // Newest first
      });
      
      return attendanceSummary;
    } catch (error) {
      console.error("Error fetching attendance report:", error);
      return null;
    }
  }

  async markAbsentees(organizationId: string): Promise<void> {
    try {
      const organizationObjectId = new mongoose.Types.ObjectId(organizationId);
      const policy = await this._policyRepository.findByOrganizationId(
        organizationObjectId
      );
      if (!policy) throw new Error("Attendance policy not found");

      const currentTime = new Date();
      const currentTimeIST = new Date(
        DateTime.fromJSDate(currentTime).setZone("Asia/Kolkata").toISO() ||
          currentTime.toISOString()
      );
      const dayOfWeek = currentTimeIST.getDay();
      console.log("daaayyyyyy", dayOfWeek);

      if (dayOfWeek == 0 ) {
        throw new CustomError("Attendance cannot be marked on weekends.", 400);
      }

      const officeEndTimeIST = new Date(
        `${currentTimeIST.toDateString()} ${policy.officeEndTime}`
      );

      if (currentTimeIST < officeEndTimeIST) {
        throw new CustomError(
          "Cannot mark absentees before office hours end.",
          400
        );
      }

      const allEmployees =
        await this._employeeRepository.getAllEmployeesByOrganization(
          organizationId
        );

      for (const employee of allEmployees) {
        const recentAttendance =
          await this._attendenceRepository.findAttendanceByDate(
            organizationId,
            employee.email,
            new Date()
          );

        if (!recentAttendance) {
          // Mark as absent
          type AttendanceStatus =
            | "present"
            | "absent"
            | "late"
            | "halfDay"
            | "onLeave";
          const attendanceData = {
            organizationId: new mongoose.Types.ObjectId(organizationId),
            employeeEmail: employee.email,
            status: "absent" as AttendanceStatus,
            date: currentTimeIST,
          };

          await this._attendenceRepository.createattendence(attendanceData);
          console.log(`Marked absent for ${employee.email}`);
        }
      }
    } catch (error: unknown) {
      console.error("Error marking absentees:", error);
      throw error;
    }
  }
}
