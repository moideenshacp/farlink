/* eslint-disable @typescript-eslint/no-explicit-any */
import ImessageModel from "../interfaces/ImessageModel";
import ImessageRepository from "../interfaces/ImessageRepository";
import messageModel from "../models/messageModel";
import BaseRepository from "./baseRepository";

export class messageRepository
  extends BaseRepository<ImessageModel>
  implements ImessageRepository
{
  constructor() {
    super(messageModel);
  }

  async createMessage(messageDetails: any): Promise<ImessageModel | null> {
    try {
      return await this.save(messageDetails);
    } catch (error) {
      console.error("Error creating message:", error);
      throw new Error("Failed to create message");
    }
  }

  async fetchMessages(chatId: string): Promise<ImessageModel[] | null> {
    try {
      return await this.model.find({ chatId }).populate("sender").exec();
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

}
