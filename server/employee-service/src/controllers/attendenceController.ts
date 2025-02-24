import { Request, Response } from "express";
import { IattendenceController } from "../interfaces/IattendenceController";
import { CustomError } from "../errors/CustomError";
import { IattendenceService } from "../interfaces/IattendenceService";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";


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
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.POLICY_UPDATED });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public getAttendencePolicy = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId } = req.query;

      if (!organizationId) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
      const result = await this._attendenceservice.getAttendencePolicy(
        organizationId as string
      );
      if (result) {
        res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.POLICY_FETCHED, result });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
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

      res.status(HttpStatusCode.OK).json({ message: MessageConstants.ATTENDENCE_MARKED });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
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
      res.status(HttpStatusCode.OK).json({
        message: MessageConstants.ATTENDENCE_DETAILS_FETCHED,
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
      res.status(HttpStatusCode.OK).json({ message: MessageConstants.ATTENDENCE_EDITED });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
}
