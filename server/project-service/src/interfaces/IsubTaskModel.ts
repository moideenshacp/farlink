import mongoose, { Document } from "mongoose";

export default interface IsubTaskModel extends Document {
    projectId: mongoose.Types.ObjectId;
    organizationId: mongoose.Types.ObjectId;
    parentTaskId: mongoose.Types.ObjectId;
    subTasks:{

        taskName: string;
        taskDescription: string;
        startDate: Date;
        endDate: Date;
        members: mongoose.Types.ObjectId[];
        priority:"high" | "medium" | "low"
        status:"in_progress"|"completed"
        fileUrl?: string;
    }[]

}
