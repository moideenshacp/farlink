/* eslint-disable @typescript-eslint/no-explicit-any */
import IchatModel from "../interfaces/IchatModel";
import IchatRepository from "../interfaces/IchatRepository";
import chatModel from "../models/chatModel";
import BaseRepository from "./baseRepository";

export class chatRepository
  extends BaseRepository<IchatModel>
  implements IchatRepository
{
  constructor() {
    super(chatModel);
  }

  async createChat(chatDetails: any): Promise<IchatModel | null> {
    try {
      if (chatDetails.chatType === "private") {
        const existingChat = await chatModel.findOne({
          chatType: "private",
          participants: { $all: chatDetails.participants, $size: 2 },
        });

        if (existingChat) {
          console.log("Private chat already exists:", existingChat);
          return existingChat;
        }
      }
      return await this.save(chatDetails);
    } catch (error) {
      console.error("Error creating chat:", error);
      throw new Error("Failed to create chat");
    }
  }
  async fetchAllPrivateChats(userId: string): Promise<IchatModel[] | null> {
    try {
      const chats = await chatModel
        .find({ chatType: "private", participants: userId })
        .populate("lastMessage")
        .sort({ updatedAt: -1 });

      return chats;
    } catch (error) {
      console.error("Error fetching private chats:", error);
      throw new Error("Failed to fetch private chats");
    }
  }
  async fetchAllChats(userId: string): Promise<IchatModel[] | null> {
    try {
      const chats = await chatModel
        .find({ participants: userId })
        .populate("lastMessage")
        .sort({ "lastMessage.updatedAt": -1, updatedAt: -1 }); 
      return chats;
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw new Error("Failed to fetch chats");
    }
  }
  async updateChat(chatId: string, updateData: any):Promise<IchatModel| null> {
    try {
      return await chatModel.findByIdAndUpdate(chatId, updateData, { new: true });
    } catch (error) {
      console.error("Error updating chat:", error);
      throw error;
    }
  }
  
}
