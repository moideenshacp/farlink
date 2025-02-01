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
          .status(200)
          .json({ message: "Meetings fetched sucessfully..", result });
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
  public editMeeting = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { meetId, meetDetails } = req.body;
      const result = await this._meetservice.editMeeting(meetId, meetDetails);
      if (result) {
        return res
          .status(200)
          .json({ message: "Meet edited sucessfully..", result });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong,please try again..." });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  public deleteMeeting = async(req: Request, res: Response): Promise<Response>=> {
    try {
        const {meetId} = req.query
        const result = await this._meetservice.deleteMeeting(meetId as string )
        if (result) {
            return res
              .status(200)
              .json({ message: "Meet deleted sucessfully.." });
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
      
  }

//   public joinMeeting = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { meetId, userId } = req.body; // Receive meetId and userId
//       const result = await this._meetservice.joinMeeting(meetId, userId);
//       if (result) {
//         return res.status(200).json({ message: "Successfully joined the meeting." });
//       } else {
//         return res.status(400).json({ message: "Failed to join the meeting. Please try again." });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error instanceof CustomError) {
//         return res.status(error.statusCode).json({ error: error.message });
//       } else {
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   };

public fetchAllMeetsOfEmployee = async(req: Request, res: Response): Promise<Response>=> {
    try {
        const {employeeId} = req.query
        const result = await this._meetservice.fetchAllMeetsOfEmployee(employeeId as string)
              if (result) {
        return res.status(200).json({ message: "Meetings fetched sucessfully.." ,result});
      } else {
        return res.status(400).json({ message: "Failed to join the meeting. Please try again." });
      }
        
    } catch (error) {
              if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
        
    }
    
}
  
}
