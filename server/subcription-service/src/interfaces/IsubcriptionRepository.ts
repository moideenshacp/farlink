import { FilterQuery } from "mongoose";
import IsubcriptionModel from "./IsubcriptionModel";

export default interface IsubcriptionRepository {
  findByEmail(email: string): Promise<IsubcriptionModel | null>;
  update(
    filter: FilterQuery<IsubcriptionModel>,
    update: Partial<IsubcriptionModel>
  ): Promise<IsubcriptionModel | null>;
  findByEmailWithPopulate(
    email: string,
    populateField: string
  ): Promise<IsubcriptionModel | null>;
  findByOrganizationId(organizationId: string): Promise<IsubcriptionModel[]>;
  findBySubscriptionId(subscriptionId: string): Promise<IsubcriptionModel | null>;
  findActiveSubscription(organizationId: string): Promise<IsubcriptionModel | null>;
}
