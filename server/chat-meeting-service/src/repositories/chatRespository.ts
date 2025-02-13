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
  async updateChat(chatId: string, updateData: Partial<IchatModel>) {
    try {
      const updatedChat = await chatModel.findByIdAndUpdate(
        chatId,
        { $set: updateData, updatedAt: new Date() },
        { new: true }
      );
      return updatedChat;
    } catch (error) {
      console.error("Error updating chat:", error);
      throw error;
    }
  }
  async getChatById(chatId: string): Promise<IchatModel | null> {
    try {
      const chat = await chatModel.findById(chatId);
      return chat;
    } catch (error) {
      console.error("Error fetching chat by ID:", error);
      throw new Error("Failed to fetch chat");
    }
  }
}
