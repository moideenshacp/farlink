import IcompanyService from "../interfaces/IcompanyService";

import IorgModel from "../interfaces/IorganizationModel";
import IuserModel from "interfaces/IuserModel";
import { publishEvent } from "../rabbitmq/producer/producer";
import IuserRepo from "interfaces/IuserRepository";
import IorganizationRepository from "interfaces/IorganizationRepository";

export class companyService implements IcompanyService {
  private _userrepository: IuserRepo;
  private _organizationRepository: IorganizationRepository;

  constructor(
    _userrepository: IuserRepo,
    _organizationRepository: IorganizationRepository
  ) {
    this._userrepository = _userrepository;
    this._organizationRepository = _organizationRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registerCompany(organization: any): Promise<string> {
    try {
      const { email, ...orgData } = organization;

      if (!email) {
        throw new Error("Email is required to register an organization.");
      }
      const admin = await this._userrepository.findByEmail(email);
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
      const queue = "subscription-service-queue";
      await publishEvent(queue, {
        event: "COMPANY_SUBCRIPTION",
        payload: {
          organizationId: newOrganization._id,
          subscriptionType: newOrganization.subscriptionType,
          industry: newOrganization.industry,
          admin: newOrganization.admin,
        },
      });

      return newOrganization._id.toString();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchCompanyProfile(email: string): Promise<IorgModel | null> {
    try {
      const userWithCompany =
        await this._userrepository.findByEmailWithPopulate(
          email,
          "organizationId"
        );
      if (!userWithCompany) {
        return null;
      }
      if (!userWithCompany.organizationId) {
        return null;
      }
      const companyDetails = userWithCompany.organizationId as IorgModel;

      return companyDetails;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateCompanyProfile(
    FormData: object,
    email: string
  ): Promise<IorgModel | null> {
    try {
      const findUserCompany =
        await this._userrepository.findByEmailWithPopulate(
          email,
          "organizationId"
        );

      if (!findUserCompany) {
        return null;
      }

      if (!findUserCompany.organizationId) {
        return null;
      }

      const companyDetails = findUserCompany.organizationId as IorgModel;

      const updatedCompany =
        await this._organizationRepository.updateOrganization(
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
  async fetchAllOrganization(): Promise<IorgModel[] | null> {
    try {
      const allOrganizations = await this._organizationRepository.findAll();
      if (!allOrganizations || allOrganizations.length === 0) {
        return null;
      }
      return allOrganizations;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async blockOrganization(email: string): Promise<IuserModel | null> {
    try {
      const organizationAdmin = await this._userrepository.findByEmail(email);
      if (!organizationAdmin) {
        return null;
      }

      let updateToBlockAndUnblock;
      if (organizationAdmin.isActive === true) {
        updateToBlockAndUnblock = await this._userrepository.update(
          { email },
          { isActive: false }
        );
      } else {
        updateToBlockAndUnblock = await this._userrepository.update(
          { email },
          { isActive: true }
        );
      }

      return updateToBlockAndUnblock;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findSubcription(email: string | null): Promise<any> {
    try {
      if (!email) {
        throw new Error("Email cannot be null or undefined");
      }

      const result = await this._userrepository.findByEmailWithPopulate(
        email,
        "organizationId"
      );

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
