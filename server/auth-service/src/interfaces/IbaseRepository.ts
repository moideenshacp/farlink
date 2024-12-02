import { Document, FilterQuery } from "mongoose";

export default interface IBaseRepo<T extends Document> {
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findAll(filter?: Partial<T>): Promise<T[]>;
    save(data: Partial<T>): Promise<T>;
    findByIdAndUpdate(id: string, update: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
