import { Request, Response } from "express";
import { ItaskController } from "../interfaces/ItaskController";
import { ItaskService } from "../interfaces/ItaskService";
import { CustomError } from "../errors/CustomError";
import { TaskValidationSchema } from "../validators/TaskValidation";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

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
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }
      const result = await this._taskservice.createTask(taskDetails);
      if (result) {
        return res.status(HttpStatusCode.OK).json({ message: MessageConstants.TAST_ADDED });
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
  public fetchTasks = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { projectId } = req.query;
      const result = await this._taskservice.fetchTasks(projectId as string);
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.TASK_FETCHED, result });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public updateTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { taskId, taskDetails } = req.body;
      const updatedTask = await this._taskservice.updateTask(
        taskId,
        taskDetails
      );
      if (updatedTask) {
        return res.status(HttpStatusCode.OK).json({ message: MessageConstants.TASK_UPDATED });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchEmployeesTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { employeeId, projectId } = req.query;
      const result = await this._taskservice.fetchEmployeesTask(
        employeeId as string,
        projectId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.FETCH_EMPLOYEES_TASK, result });
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
  public fetchAllTasksOfEmployee = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { employeeId } = req.query;
      const result = await this._taskservice.fetchAllTasksOfEmployee(
        employeeId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.FETCH_ALL_TASKS_EMPLOYEES, result });
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

  public createSubTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { taskDetails } = req.body;
      const result = await this._taskservice.createSubTask(taskDetails);
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.SUBTASK_CREATED });
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
  public updateSubTask = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { taskId, taskDetails } = req.body;
      const updatedTask = await this._taskservice.updateSubTask(
        taskId,
        taskDetails
      );
      if (updatedTask) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.SUBTASK_UPDATED });
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
  public fetchAllSubTasks = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { parentTaskId } = req.query;
      const result = await this._taskservice.fetchAllSubTasks(
        parentTaskId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.FETCH_SUBTASK, result });
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
