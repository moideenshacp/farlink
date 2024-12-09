import IcompanyService from "../interfaces/IcompanyService";
import { userRepository } from "../repositories/userRepository";
import Organization from "../models/OrganizationModel"; // Mongoose model for Organization

export class companyService implements IcompanyService {
  private _userrepository!: userRepository;

  constructor() {
    this._userrepository = new userRepository();
  }

  async registerCompany(organization: any): Promise<void> {
    try {
      const { email, ...orgData } = organization;

      if (!email) {
        throw new Error("Email is required to register an organization.");
      }

      // Find admin by email
      const admin = await this._userrepository.findOne({ email });
      if (!admin) {
        throw new Error("Admin with the provided email does not exist.");
      }

      // Proceed to create the organization if admin is found
      const newOrganization = new Organization({
        ...orgData,
        admin: admin._id, // Reference the admin ID
      });

      await newOrganization.save();
      console.log("Organization registered successfully:", newOrganization);
    } catch (error) {
      console.error("Error registering organization:", error);
      throw error;
    }
  }
}
