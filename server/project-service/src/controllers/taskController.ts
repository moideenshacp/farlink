import { Request, Response } from "express";
import { ItaskController } from "../interfaces/ItaskController";
import { ItaskService } from "../interfaces/ItaskService";
import { CustomError } from "../errors/CustomError";
import { TaskValidationSchema } from "../validators/TaskValidation";

export class taskController implements ItaskController {
  private _taskservice: ItaskService;
  constructor(_taskservice: ItaskService) {
    this._taskservice = _taskservice;
  }
  public createTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { taskDetails } = req.body;
      const { error } = TaskValidationSchema.validate(taskDetails, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }
      const result = await this._taskservice.createTask(taskDetails);
      if (result) {
        return res.status(200).json({ message: "Task added successfully..." });
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
  public fetchTasks = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { projectId } = req.query;
      const result = await this._taskservice.fetchTasks(
        projectId as string
      );
      if (result) {
        return res
          .status(200)
          .json({ message: "Tasks fetched successfully...", result });
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
  public updateTask = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const { taskId, taskDetails } = req.body;
        console.log("taskID:", taskDetails);
        const updatedTask = await this._taskservice.updateTask(
          taskId,
          taskDetails
        );
        if (updatedTask) {
          return res
            .status(200)
            .json({ message: "Task updated sucessfully.." });
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
      
  }
  public fetchEmployeesTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { employeeId,projectId } = req.query;
      const result = await this._taskservice.fetchEmployeesTask(
        employeeId as string,
        projectId as string
      );
      if (result) {
        return res
          .status(200)
          .json({ message: "Tasks fetched sucessfully..",result });
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
