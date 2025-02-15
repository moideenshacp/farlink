import { Request, Response } from "express";
import { IattendenceController } from "../interfaces/IattendenceController";
import { CustomError } from "../errors/CustomError";
import { IattendenceService } from "../interfaces/IattendenceService";

export class attendenceController implements IattendenceController {
  private _attendenceservice: IattendenceService;

  constructor(_attendenceservice: IattendenceService) {
    this._attendenceservice = _attendenceservice;
  }

  public UpdateAttendencePolicy = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { policyData, organizationId } = req.body;

      const result = await this._attendenceservice.UpdateAttendencePolicy(
        policyData,
        organizationId
      );
      if (result) {
        res.status(200).json({ message: "Policy Updated successfully" });
      } else {
        res.status(400).json({ message: "Policy updation failed.." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  public getAttendencePolicy = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId } = req.query;

      if (!organizationId) {
        res.status(400).json({ message: "No organizationId is provided" });
      }
      const result = await this._attendenceservice.getAttendencePolicy(
        organizationId as string
      );
      if (result) {
        res
          .status(200)
          .json({ message: "Policy fetched successfully", result });
      } else {
        res.status(200).json({ message: "No policy found.." });
      }
    } catch (error) {
      console.log(error);
    }
  };
  public handleAttendence = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId, employeeEmail } = req.body;
      await this._attendenceservice.handleAttendence(
        organizationId,
        employeeEmail
      );

      res.status(200).json({ message: "Attendence marked successfully" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  public getAttendenceReport = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { employeeEmail } = req.query;

      const attendancereport =
        await this._attendenceservice.getAttendenceReport(
          employeeEmail as string
        );
      res.status(200).json({
        message: "Attendence details fetched successfully",
        attendancereport,
      });
    } catch (error) {
      console.log(error);
    }
  };
  public editAttendance = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { attendenceId, checkIn, checkOut } = req.body;
      await this._attendenceservice.editAttendance(
        attendenceId,
        checkIn,
        checkOut
      );
      res.status(200).json({ message: "Attendence edited successfully" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
