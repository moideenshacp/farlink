/* eslint-disable @typescript-eslint/no-explicit-any */
import { publishEvent } from "../rabbitmq/producer/producer";
import { IemployeeData } from "../interfaces/IemployeeData";
import IemployeeModel from "../interfaces/IemployeeModel";
import { IemployeeService } from "../interfaces/IemployeeService";
import { EmailService } from "../utils/emailVerify";
import bcrypt from "bcryptjs";
import { CustomError } from "../errors/CustomError";
import IpositionModel from "../interfaces/IpositionModel";
import mongoose from "mongoose";
import IemployeeRepo from "../interfaces/IemployeeRepository";
import IpositionRepo from "../interfaces/IpositionRepo";
import { HttpStatusCode } from "../constants/HttpStatusCode";

export class employeeService implements IemployeeService {
  private _employeeRepository: IemployeeRepo;
  private _positionRepository: IpositionRepo;

  constructor(
    _employeeRepository: IemployeeRepo,
    _positionRepository: IpositionRepo
  ) {
    this._employeeRepository = _employeeRepository;
    this._positionRepository = _positionRepository;
  }

  async registerEmployee(
    employeeData: IemployeeData
  ): Promise<IemployeeModel | null> {
    try {
      const employeeExist = await this._employeeRepository.findByEmail(
        employeeData.email
      );
      if (employeeExist) {
        throw new CustomError("Email already Exist", HttpStatusCode.BAD_REQUEST);
      }

      const registeredEmployee = await this._employeeRepository.createEmployee(
        employeeData
      );

      const queue = "user-service-queue";
      await publishEvent(queue, {
        event: "REGISTER_EMPLOYEE",
        payload: {
          id: registeredEmployee?._id,
          name: registeredEmployee?.userName,
          email: registeredEmployee?.email,
          firstName: registeredEmployee?.firstName,
          lastName: registeredEmployee?.lastName,
          phone: registeredEmployee?.phone,
          role: registeredEmployee?.role,
          image: registeredEmployee?.image,
          organizationId: registeredEmployee?.organizationId,
          position: registeredEmployee?.position,
        },
      });
      return registeredEmployee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllEmployees(
    organizationId: string,
    page?: number,
    pageSize?: number
  ): Promise<{ employees: IemployeeModel[]; totalEmployees: number }> {
    try {
      // Count total employees
      const totalEmployees =
        await this._employeeRepository.countEmployeesByOrganization(
          organizationId
        );

      // Fetch employees with optional pagination
      const employees = await this._employeeRepository.findByOrganizationId(
        organizationId,
        page,
        pageSize
      );

      return { employees, totalEmployees };
    } catch (error) {
      console.error("Error in fetching employees:", error);
      throw error;
    }
  }

  async updateEmployee(
    employeeId: string,
    employeeData: IemployeeModel | null
  ): Promise<IemployeeModel> {
    try {
      if (!employeeData) {
        throw new Error("Employee data cannot be null");
      }

      const findEmployee = await this._employeeRepository.update(
        new mongoose.Types.ObjectId(employeeId),
        employeeData
      );

      if (!findEmployee) {
        throw new Error("Employee not found");
      }
      const queue = "user-service-queue";
      await publishEvent(queue, {
        event: "UPDATE_EMPLOYEE",
        payload: {
          id: findEmployee?._id,
          name: employeeData?.userName,
          email: employeeData?.email,
          firstName: employeeData?.firstName,
          lastName: employeeData?.lastName,
          phone: employeeData?.phone,
          role: employeeData?.role,
          image: employeeData?.image,
          organizationId: findEmployee?.organizationId,
          position: findEmployee?.position,
        },
      });
      return findEmployee;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  async inviteEmployee(email: string): Promise<string> {
    try {
      await EmailService.sendVerificationMail(email);
      return "email sended successfully";
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  async setUpPassword(password: string, email: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const queue = "user-service-queue";
      await publishEvent(queue, {
        event: "SET_UP_PASSWORD",
        payload: {
          password: hashedPassword,
          email: email,
        },
      });
      return "successfully updated";
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  async EmployeesCount(organizationId: string): Promise<any> {
    try {
      const employeeData = await this._employeeRepository.findByOrganizationId(
        organizationId
      );
      const ActiveEmployeesCount = employeeData.filter(
        (data) => data.isActive === true
      ).length;
      const TerminatedEmployeesCount = employeeData.filter(
        (data) => data.isActive === false
      ).length;

      const data = { ActiveEmployeesCount, TerminatedEmployeesCount };
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async TerminateEmployee(email: string): Promise<any> {
    try {
      const employee = await this._employeeRepository.findByEmail(email);

      if (!employee) {
        throw new CustomError("employee not found", HttpStatusCode.BAD_REQUEST);
      }
      const queue = "user-service-queue";
      await publishEvent(queue, {
        event: "TERMINATE_EMPLOYEE",
        payload: {
          email: email,
        },
      });
      let TerminateEmployee;
      if (employee.isActive === true) {
        TerminateEmployee = await this._employeeRepository.update(
          { email },
          { isActive: false }
        );
      } else {
        TerminateEmployee = await this._employeeRepository.update(
          { email },
          { isActive: true }
        );
      }
      return TerminateEmployee;
    } catch (error) {
      console.log(error);
    }
  }
  async AddPosition(
    organizationId: string,
    position: string
  ): Promise<IpositionModel | null> {
    try {
      if (organizationId && position) {
        const organizationObjectId = new mongoose.Types.ObjectId(
          organizationId
        );
        const existingRecord =
          await this._positionRepository.findByOrganizationId(
            organizationObjectId
          );

        if (existingRecord && existingRecord.positions.includes(position)) {
          console.error(
            `Position "${position}" already exists for this organization.`
          );
          throw new CustomError(
            `Position "${position}" already exists for this organization.`,
            HttpStatusCode.BAD_REQUEST
          );
        }
        const positionAdded = await this._positionRepository.createPosition(
          organizationObjectId,
          position
        );

        return positionAdded;
      }

      return null;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  async fetchPosition(organizationId: string): Promise<IpositionModel | null> {
    try {
      const organizationObjectId = new mongoose.Types.ObjectId(organizationId);
      const positions = await this._positionRepository.findByOrganizationId(
        organizationObjectId
      );
      if (positions) {
        return positions;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async fetchEmployeesId(
    employeeId: string[]
  ): Promise<IemployeeModel[] | null> {
    try {
      const employees = await this._employeeRepository.findEmployeesByIds(
        employeeId
      );
      if (employees) {
        return employees;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
