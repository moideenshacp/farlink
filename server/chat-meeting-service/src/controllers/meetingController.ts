import { Request, Response } from "express";
import { ImeetingController } from "../interfaces/ImeetingController";
import { ImeetingService } from "../interfaces/ImeetingService";
import { CustomError } from "../errors/CustomError";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class meetController implements ImeetingController {
  private _meetservice: ImeetingService;

  constructor(_meetservice: ImeetingService) {
    this._meetservice = _meetservice;
  }
  public createMeeting = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { meetDetails } = req.body;

      const result = await this._meetservice.createMeeting(meetDetails);
      if (result) {
        return res.status(HttpStatusCode.OK).json({ message: MessageConstants.MEET_CREATED });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchMeeting = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { organizationId } = req.query;
      const result = await this._meetservice.fetchMeeting(
        organizationId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.MEETINGS_FETCHED, result });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public editMeeting = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { meetId, meetDetails } = req.body;
      const result = await this._meetservice.editMeeting(meetId, meetDetails);
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.MEET_EDITED, result });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public deleteMeeting = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { meetId } = req.query;
      const result = await this._meetservice.deleteMeeting(meetId as string);
      if (result) {
        return res.status(HttpStatusCode.OK).json({ message: MessageConstants.MEET_DELETED });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };

  public fetchAllMeetsOfEmployee = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { employeeId } = req.query;
      const result = await this._meetservice.fetchAllMeetsOfEmployee(
        employeeId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.FETCHED_EMP_MEETINGS, result });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
}
