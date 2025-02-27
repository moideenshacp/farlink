/* eslint-disable @typescript-eslint/no-explicit-any */

import { IleaveService } from "../interfaces/IleaveService";
import { CustomError } from "../errors/CustomError";
import IleaveModel from "../interfaces/IleaveModel";
import IleaveRepo from "../interfaces/IleaveRepository";
import IpolicyRepo from "../interfaces/IpolicyRepo";
import mongoose from "mongoose";
import IAttendancePolicyModel from "../interfaces/IpolicyModel";
import { HttpStatusCode } from "../constants/HttpStatusCode";

export class leaveService implements IleaveService {
  private _policyRepository: IpolicyRepo;
  private _leaveRepository: IleaveRepo;

  constructor(_policyRepository: IpolicyRepo, _leaveRepository: IleaveRepo) {
    this._policyRepository = _policyRepository;
    this._leaveRepository = _leaveRepository;
  }

  async handleLeaveApplication(data: any): Promise<IleaveModel | null> {
    try {
      const policy = await this._policyRepository.findByOrganizationId(
        data.organizationId
      );
      const leaveType = data.formData.leaveType;
      if (policy) {
        if (!policy.leaveType || !(leaveType in policy.leaveType)) {
          throw new Error(`Invalid leave type: ${leaveType}`);
        }

        const startDate = new Date(data.formData.fromDate.split("T")[0]);
        const endDate = new Date(data.formData.toDate.split("T")[0]);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const officeStartTime = policy.officeStartTime;
        if (officeStartTime) {
          const [officeStartHour, officeStartMinute] = officeStartTime
            .toString()
            .split(":")
            .map(Number);

          const leaveApplicationDate = new Date(data.formData.fromDate);
          if (
            leaveApplicationDate.getDate() === currentDate.getDate() &&
            leaveApplicationDate.getMonth() === currentDate.getMonth() &&
            leaveApplicationDate.getFullYear() === currentDate.getFullYear()
          ) {
            if (
              leaveApplicationDate.getHours() > officeStartHour ||
              (leaveApplicationDate.getHours() === officeStartHour &&
                leaveApplicationDate.getMinutes() > officeStartMinute)
            ) {
              throw new CustomError(
                `Leave cannot be applied after the office start time (${policy.officeStartTime}) on the same day.`,
                HttpStatusCode.BAD_REQUEST
              );
            }
          }
        }

        if (startDate < currentDate || endDate < currentDate) {
          throw new CustomError("Leave dates cannot be in the past.", HttpStatusCode.BAD_REQUEST);
        }

        if (endDate < startDate) {
          throw new CustomError(
            "The end date must be greater than the start date.",
            HttpStatusCode.BAD_REQUEST
          );
        }
        const overlappingLeaves =
          await this._leaveRepository.getApprovedLeavesInDateRange(
            data.organizationId,
            data.employeeEmail,
            startDate,
            endDate
          );

        if (overlappingLeaves.length > 0) {
          throw new CustomError(
            "You already have approved leave's during the selected date range.",
            HttpStatusCode.BAD_REQUEST
          );
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

        const allowedLeaves = Number(
          policy.leaveType[leaveType as keyof typeof policy.leaveType]
        );
        const requestedDays =
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          ) + 1;

        if (leavesTakenThisMonth + requestedDays > allowedLeaves) {
          throw new CustomError(
            `Insufficient leave balance for ${leaveType} in the current month.`,
            HttpStatusCode.BAD_REQUEST
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

          return dateB.getTime() - dateA.getTime();
        });
        return sortedLeaves;
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async ManageAppliedLeaves(
    leaveId: string,
    status: "pending" | "approved" | "rejected"
  ): Promise<IleaveModel | null> {
    try {
      const updated = await this._leaveRepository.updateStatus(
        { _id: leaveId },
        { status: status }
      );
      if (updated) {
        return updated;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async fetchRemainingLeaves(
    organizationId: string,
    employeeEmail: string
  ): Promise<any | null> {
    try {
      const organizationObjectId = new mongoose.Types.ObjectId(organizationId);
      const policy = await this._policyRepository.findByOrganizationId(
        organizationObjectId
      );
      if (!policy) {
        throw new Error("Policy not found for organization.");
      }

      const leaveTypes = Object.keys(policy.leaveType) as Array<
        keyof IAttendancePolicyModel["leaveType"]
      >;
      const remainingLeaves: any = {};

      for (const leaveType of leaveTypes) {
        const allowedLeaves = Number(policy.leaveType[leaveType]);

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const approvedLeavesThisMonth =
          await this._leaveRepository.getLeavesTakenInMonth(
            organizationId,
            employeeEmail,
            leaveType,
            currentMonth,
            currentYear
          );

        remainingLeaves[leaveType] = allowedLeaves - approvedLeavesThisMonth;
      }

      return remainingLeaves;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async editLeave(leaveId: string, data: any): Promise<IleaveModel | null> {
    try {
      // Fetch the existing leave application
      const existingLeave = await this._leaveRepository.findById(leaveId);
      if (!existingLeave) {
        throw new CustomError("Leave application not found.", HttpStatusCode.NOT_FOUND);
      }

      // Fetch the organization's leave policy
      const policy = await this._policyRepository.findByOrganizationId(
        data.organizationId
      );

      if (!policy) {
        throw new CustomError("Leave policy not found.", HttpStatusCode.BAD_REQUEST);
      }

      const leaveType = data.formData.leaveType;
      if (!policy.leaveType || !(leaveType in policy.leaveType)) {
        throw new CustomError(`Invalid leave type: ${leaveType}`, HttpStatusCode.BAD_REQUEST);
      }

      const startDate = new Date(data.formData.fromDate.split("T")[0]);
      const endDate = new Date(data.formData.toDate.split("T")[0]);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      // Validate office start time for same-day leave applications
      const officeStartTime = policy.officeStartTime;
      if (officeStartTime) {
        const [officeStartHour, officeStartMinute] = officeStartTime
          .toString()
          .split(":")
          .map(Number);

        const leaveApplicationDate = new Date(data.formData.fromDate);
        if (
          leaveApplicationDate.getDate() === currentDate.getDate() &&
          leaveApplicationDate.getMonth() === currentDate.getMonth() &&
          leaveApplicationDate.getFullYear() === currentDate.getFullYear()
        ) {
          if (
            leaveApplicationDate.getHours() > officeStartHour ||
            (leaveApplicationDate.getHours() === officeStartHour &&
              leaveApplicationDate.getMinutes() > officeStartMinute)
          ) {
            throw new CustomError(
              `Leave cannot be edited after the office start time (${policy.officeStartTime}) on the same day.`,
              HttpStatusCode.BAD_REQUEST
            );
          }
        }
      }

      // Validate leave dates
      if (startDate < currentDate || endDate < currentDate) {
        throw new CustomError("Leave dates cannot be in the past.", HttpStatusCode.BAD_REQUEST);
      }
      if (endDate < startDate) {
        throw new CustomError(
          "The end date must be greater than the start date.",
          HttpStatusCode.BAD_REQUEST
        );
      }

      // Check for overlapping approved leaves
      const overlappingLeaves =
        await this._leaveRepository.getApprovedLeavesInDateRange(
          data.organizationId,
          data.employeeEmail,
          startDate,
          endDate,
          leaveId // Exclude the current leave application from overlap check
        );

      if (overlappingLeaves.length > 0) {
        throw new CustomError(
          "You already have approved leave's during the selected date range.",
          HttpStatusCode.BAD_REQUEST
        );
      }

      // Check leave balance
      const currentMonth = startDate.getMonth() + 1;
      const currentYear = startDate.getFullYear();

      const leavesTakenThisMonth =
        await this._leaveRepository.getLeavesTakenInMonth(
          data.organizationId,
          data.employeeEmail,
          leaveType,
          currentMonth,
          currentYear
        );

      const allowedLeaves = Number(
        policy.leaveType[leaveType as keyof typeof policy.leaveType]
      );
      const requestedDays =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        ) + 1;

      if (leavesTakenThisMonth + requestedDays > allowedLeaves) {
        throw new CustomError(
          `Insufficient leave balance for ${leaveType} in the current month.`,
          HttpStatusCode.BAD_REQUEST
        );
      }

      // Update leave details
      existingLeave.leaveType = leaveType;
      existingLeave.startDate = startDate;
      existingLeave.endDate = endDate;
      existingLeave.reason = data.formData.reason;

      const updatedLeave = await this._leaveRepository.updateLeave(
        existingLeave
      );
      return updatedLeave;
    } catch (error) {
      console.error("Error editing leave application:", error);
      throw error;
    }
  }
}
