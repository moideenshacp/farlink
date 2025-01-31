import { Request, Response } from "express";
import { ImeetingController } from "../interfaces/ImeetingController";
import { ImeetingService } from "../interfaces/ImeetingService";
import { CustomError } from "../errors/CustomError";

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
        return res.status(200).json({ message: "Meet created sucessfully.." });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong,please try again..." });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
