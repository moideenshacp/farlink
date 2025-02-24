import { IemployeeController } from "../interfaces/IemployeeController";
import { Request, Response } from "express";
import { registerEmployeeSchema } from "../validators/RegisterEmployeeValidator";
import { employeeProfileUpdate } from "../validators/EmployeeProfileUpdate";
import { setUpPasswordSchema } from "../validators/SetUpPassword";
import { CustomError } from "../errors/CustomError";
import { IemployeeService } from "../interfaces/IemployeeService";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class employeeController implements IemployeeController {
  private _employeeservice: IemployeeService;

  constructor(_employeeservice: IemployeeService) {
    this._employeeservice = _employeeservice
  }

  public registerEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { employeeData } = req.body;

      const { error } = registerEmployeeSchema.validate(employeeData, {
        abortEarly: false,
      });

      if (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "validaton error",
          details: error.details[0].message,
        });
        return;
      }
      const registeredEmployee = await this._employeeservice.registerEmployee(
        employeeData
      );
      if (registeredEmployee) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.EMPLOYEE_ADDED });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public getAllEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId,page,pageSize } = req.query;
      if (!organizationId) {
        throw new Error("organix=zation id is needed");
      }
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : undefined;
      const {employees,totalEmployees} = await this._employeeservice.getAllEmployees(
        organizationId as string,pageNumber,pageSizeNumber
      );
      res.status(HttpStatusCode.OK).json({ message: "sucess", employees,totalEmployees });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public updateEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { employeeId, ...otherData } = req.body.data;
      const { error } = employeeProfileUpdate.validate(otherData, {
        abortEarly: false,
      });

      if (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "validaton error",
          details: error.details[0].message,
        });
        return;
      }

      const updatedEmployee = await this._employeeservice.updateEmployee(
        employeeId,
        otherData
      );
      if (updatedEmployee) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.EMPLOYEE_UPDATED });
      }
    } catch (error) {
      console.log(error);
    }
  };
  public inviteEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.body;
      const invitation = await this._employeeservice.inviteEmployee(email);

      if (invitation) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.INVITATION_SENDED});
      }
    } catch (error) {
      console.log(error);
    }
  };
  public setUpPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, ...otherData } = req.body;
      const { error } = setUpPasswordSchema.validate(otherData, {
        abortEarly: false,
      });

      if (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "validaton error",
          details: error.details[0].message,
        });
        return;
      }
      const updated = await this._employeeservice.setUpPassword(
        req.body.password,
        email
      );
      if (updated) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.PASSWORD_SET_UP});
      }
    } catch (error) {
      console.log(error);
    }
  };
  public EmployeesCount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organizationId } = req.query;
      if (!organizationId) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: MessageConstants.BAD_REQUEST });
        return;
      }
      const employeeCountResponse = await this._employeeservice.EmployeesCount(
        organizationId as string
      );

      if (employeeCountResponse) {
        res.status(HttpStatusCode.OK).json({
          message: MessageConstants.EMPLOYEES_COUNT_FETCHED,
          data: employeeCountResponse,
        });
      } else {
        res.status(HttpStatusCode.NOT_FOUND).json({ message:MessageConstants.NOT_FOUND });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public TerminateEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.query;
      const result = await this._employeeservice.TerminateEmployee(
        email as string
      );
      if (result) {
        res.status(HttpStatusCode.OK).json({
          message: MessageConstants.EMPLOYEE_TERMINATED,
          isActive: result.isActive,
        });
      } else {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message:MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };

  public AddPosition = async (req: Request, res: Response): Promise<void> => {
    try {
      const { organizationId, position } = req.body;
      const positionAdded = await this._employeeservice.AddPosition(
        organizationId,
        position
      );
      if (positionAdded) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.POSITION_ADDED});
        return;
      }
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: MessageConstants.BAD_REQUEST });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR});
      }
    }
  };

  public fetchPosition = async (req: Request, res: Response): Promise<void> => {
    try {
      const { organizationId } = req.query;

      const result = await this._employeeservice.fetchPosition(organizationId as string);
      if (result) {
        res.status(HttpStatusCode.OK).json({ message: MessageConstants.POSITION_FETCHED, result });
        return;
      }
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST, result });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public fetchEmployeesId = async(req: Request, res: Response): Promise<void> =>{
    try {
      const {employeeIds} = req.query
      
      const employees = await this._employeeservice.fetchEmployeesId(employeeIds as string[])
      res.status(HttpStatusCode.OK).json({message:MessageConstants.EMPLOYEES_FETCHED,employees})
    } catch (error) {
      console.log(error);
      
    }
  }
}
