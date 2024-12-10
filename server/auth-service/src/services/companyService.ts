import IcompanyService from "../interfaces/IcompanyService";
import { userRepository } from "../repositories/userRepository";
import Organization from "../models/OrganizationModel";
import { organizationRepository } from "../repositories/organizationRepository";

export class companyService implements IcompanyService {
  private _userrepository!: userRepository;
  private _organizationRepository: organizationRepository;

  constructor() {
    this._userrepository = new userRepository();
    this._organizationRepository = new organizationRepository();
  }

  async registerCompany(organization: any): Promise<void> {
    try {
      const { email, ...orgData } = organization;

      if (!email) {
        throw new Error("Email is required to register an organization.");
      }
      const admin = await this._userrepository.findOne({ email });
      if (!admin) {
        throw new Error("Admin with the provided email does not exist.");
      }
      const newOrganization =
        await this._organizationRepository.createOrganization({
          ...orgData,
          admin: admin._id,
        });
      if (!newOrganization) {
        throw new Error("Failed to create a new organization.");
      }

      await this._userrepository.update(
        { _id: admin._id },
        {
          isOrganizationAdded: true,
          organizationId: newOrganization._id,
        }
      );

      console.log("Organization registered successfully", newOrganization);
    } catch (error) {
      console.error("Error registering organization:", error);
      throw error;
    }
  }
  async fetchCompanyProfile(email: string): Promise<void> {
    try {
      // Fetch user and populate organization details
      const userWithCompany = await this._userrepository.findByEmailWithPopulate(email,"organizationId" )
      
      if (!userWithCompany) {
        console.log("User not found.");
        return;
      }
  
      console.log("User details with company:", userWithCompany);
  
      if (!userWithCompany.organizationId) {
        console.log("No organization associated with this user.");
      } else {
        console.log("Company details:", userWithCompany.organizationId);
      }
    } catch (error) {
      console.error("Error fetching company profile:", error);
    }
  }
  
}
