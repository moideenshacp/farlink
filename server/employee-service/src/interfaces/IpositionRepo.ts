import mongoose from "mongoose";
import IpositionModel from "./IpositionModel";

export default interface IpositionRepo {
    createPosition(
        organizationId: mongoose.Types.ObjectId,
        position: string
      ): Promise<IpositionModel | null>;    
}
