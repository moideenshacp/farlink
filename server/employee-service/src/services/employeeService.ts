import { publishEvent } from "../rabbitmq/producer/producer";
import { IemployeeData } from "../interfaces/IemployeeData";
import IemployeeModel from "../interfaces/IemployeeModel";
import { IemployeeService } from "../interfaces/IemployeeService";
import { employeeRepository } from "../repositories/employeeRepository";
import { EmailService } from "../utils/emailVerify";
import bcrypt from "bcryptjs";

export class employeeService implements IemployeeService {
  private _employeeRepository: employeeRepository;

  constructor() {
    this._employeeRepository = new employeeRepository();
  }

  async registerEmployee(employeeData: IemployeeData): Promise<IemployeeModel | null> {
    try {
      console.log("username", employeeData);

      const employeeExist = await this._employeeRepository.findByEmail(
        employeeData.email
      );
      if (employeeExist) {
        throw new Error("already exist");
      }

      const registeredEmployee = await this._employeeRepository.createEmployee(
        employeeData
      );

      console.log("savedd", registeredEmployee);

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
        },
      });
      return registeredEmployee
    } catch (error) {
      console.log(error);
      return null
    }
  }
  async getAllEmployees(
    organizationId: string
  ): Promise<IemployeeModel[] | null> {
    try {
      console.log(organizationId, "orgggid----------------------");

      const allEmployees = await this._employeeRepository.findByOrganizationId(
        organizationId
      );

      console.log(allEmployees, "allEmployees for company");
      return allEmployees;
    } catch (error) {
      console.log(error);
      return null;
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

      console.log(employeeData);
      console.log(employeeId, "fromservice");

      const findEmployee = await this._employeeRepository.findByIdAndUpdate(
        employeeId,
        employeeData
      );

      if (!findEmployee) {
        throw new Error("Employee not found");
      }
      console.log("kitty mwone kitty", findEmployee);
      const queue = "user-service-queue";
      await publishEvent(queue, {
        event: "UPDATE_EMPLOYEE",
        payload: {
          id: findEmployee?._id,
          name: findEmployee?.userName,
          email: findEmployee?.email,
          firstName: findEmployee?.firstName,
          lastName: findEmployee?.lastName,
          phone: findEmployee?.phone,
          role: findEmployee?.role,
          image: findEmployee?.image,
          organizationId: findEmployee?.organizationId,
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
  async setUpPassword(password: string,email:string): Promise<string> {
    try {
      console.log(password, "passsssssssssssssssssssss");
      console.log(email, "email------------------of melployee");
      const hashedPassword = await bcrypt.hash(password, 10);

      const queue = "user-service-queue";
      await publishEvent(queue, {
        event: "SET_UP_PASSWORD",
        payload: {
          password: hashedPassword,
          email:email
        },
      });
      return "successfully updated";
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
