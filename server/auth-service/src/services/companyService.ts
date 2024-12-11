import IcompanyService from "../interfaces/IcompanyService";
import { userRepository } from "../repositories/userRepository";
import Organization from "../models/OrganizationModel";
import { organizationRepository } from "../repositories/organizationRepository";
import { ObjectId } from "mongoose";
import IorgModel from "../interfaces/IorganizationModel";

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
      console.log(error);
      throw error;
    }
  }
  async fetchCompanyProfile(email: string): Promise<IorgModel | null> {
    try {
      const userWithCompany = await this._userrepository.findByEmailWithPopulate(email, "organizationId");
      if (!userWithCompany) {
        console.log("User not found.");
        return null;
      }
      if (!userWithCompany.organizationId) {
        console.log("No organization associated with this user.");
        return null;
      }
        const companyDetails = userWithCompany.organizationId as IorgModel;
  
      return companyDetails;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateCompanyProfile(FormData: object, email: string): Promise<IorgModel | null> {
    try {
      const findUserCompany = await this._userrepository.findByEmailWithPopulate(email, "organizationId");
      
      if (!findUserCompany) {
        return null;
      }
      
      if (!findUserCompany.organizationId) {
        return null;
      }
      
      const companyDetails = findUserCompany.organizationId as IorgModel;
    
      const updatedCompany = await this._organizationRepository.updateOrganization(
        { _id: companyDetails._id.toString() },
        FormData
      );  
      if (!updatedCompany) {
        return null;
      }
    
      return updatedCompany;
      
    } catch (error) {
      console.log("Error updating company profile:", error);
      return null;
    }
  }
  

  
  
}
