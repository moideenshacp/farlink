import { Request, Response } from "express";
import { IleaveController } from "../interfaces/IleaveController";
import { CustomError } from "../errors/CustomError";
import { IleaveService } from "../interfaces/IleaveService";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class leaveController implements IleaveController {
  private _leaveservice: IleaveService;

  constructor(_leaveservice: IleaveService) {
    this._leaveservice = _leaveservice;
  }
  public handleLeaveApplication = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { leaveData } = req.body;
      const savedLeave = await this._leaveservice.handleLeaveApplication(
        leaveData
      );
      if (savedLeave) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.LEAVE_APPLIED });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchAppliedLeaves = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { employeeEmail } = req.query;
      const leaves = await this._leaveservice.fetchAppliedLeaves(
        employeeEmail as string
      );
      if (leaves) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.FETCH_APPLIED_LEAVE, leaves });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public ManageAppliedLeaves = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { leaveId, status } = req.body;
      const updated = await this._leaveservice.ManageAppliedLeaves(
        leaveId,
        status
      );
      if (updated) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.LEAVE_MANAGED });
        return;
      }
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public fetchRemainingLeaves = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId, employeeEmail } = req.query;
      const result = await this._leaveservice.fetchRemainingLeaves(
        organizationId as string,
        employeeEmail as string
      );
      if (result) {
        res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.FETCH_REMAINING_LEAVE, result });
        return;
      }
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public editLeave = async (req: Request, res: Response): Promise<void> => {
    try {
      const { leaveId, formData } = req.body;
      const savedLeave = await this._leaveservice.editLeave(leaveId, formData);
      if (savedLeave) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.LEAVE_EDITED });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
}
