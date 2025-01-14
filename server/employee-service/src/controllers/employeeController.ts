import { IemployeeController } from "../interfaces/IemployeeController";
import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";
import { registerEmployeeSchema } from "../validators/RegisterEmployeeValidator";
import { employeeProfileUpdate } from "../validators/EmployeeProfileUpdate";
import { setUpPasswordSchema } from "../validators/SetUpPassword";
import { CustomError } from "../errors/CustomError";

export class employeeController implements IemployeeController {
  private _employeeservice: employeeService;

  constructor() {
    this._employeeservice = new employeeService();
  }

  public registerEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { employeeData } = req.body;

      console.log("emoloyeee", employeeData);

      const { error } = registerEmployeeSchema.validate(employeeData, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({
          message: "validaton error",
          details: error.details[0].message,
        });
        console.log("Validation Error:", error.details);
        return;
      }
      const registeredEmployee = await this._employeeservice.registerEmployee(
        employeeData
      );
      if (registeredEmployee) {
        res.status(200).json({ message: "Employee added successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  public getAllEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log("gte in allllll");

      const { organizationId } = req.query;
      if (!organizationId) {
        throw new Error("organix=zation id is needed");
      }
      const employees = await this._employeeservice.getAllEmployees(
        organizationId as string
      );
      res.status(200).json({ message: "sucess", employees });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Interval server error" });
    }
  };
  public updateEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log("get in to update=======================================");

      const { employeeId, ...otherData } = req.body.data;
      const { error } = employeeProfileUpdate.validate(otherData, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({
          message: "validaton error",
          details: error.details[0].message,
        });
        console.log("Validation Error:", error.details);
        return;
      }

      const updatedEmployee = await this._employeeservice.updateEmployee(
        employeeId,
        otherData
      );
      if (updatedEmployee) {
        res.status(200).json({ message: "employee updated" });
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
        res.status(200).json({ message: "Invitation sended successfully" });
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
        res.status(400).json({
          message: "validaton error",
          details: error.details[0].message,
        });
        console.log("Validation Error:", error.details);
        return;
      }
      const updated = await this._employeeservice.setUpPassword(
        req.body.password,
        email
      );
      if (updated) {
        res.status(200).json({ message: "Password set-up successfully" });
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
        res.status(404).json({ message: "No organization found." });
        return;
      }
      const employeeCountResponse = await this._employeeservice.EmployeesCount(
        organizationId as string
      );

      if (employeeCountResponse) {
        res.status(200).json({
          message: "Employees count fetched successfully",
          data: employeeCountResponse,
        });
      } else {
        res.status(404).json({ message: "No employees found." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
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
        res.status(200).json({
          message: "Employee terminated successfully",
          isActive: result.isActive,
        });
      } else {
        res.status(400).json({ message: "Employee Termination failed.." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
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
        res.status(200).json({ message: "Position added successfully" });
        return;
      }
      res
        .status(400)
        .json({ message: "An Error occurred while adding position" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };

  public fetchPosition = async (req: Request, res: Response): Promise<void> => {
    try {
      const { organizationId } = req.body;

      const result = await this._employeeservice.fetchPosition(organizationId);
      if (result) {
        res.status(200).json({ message: "Positions fetched sucessfully..", result });
        return;
      }
      res.status(400).json({ message: "Positions fetching failed..", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
