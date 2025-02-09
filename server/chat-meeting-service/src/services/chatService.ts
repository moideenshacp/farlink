/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError } from "../errors/CustomError";
import { IchatService } from "../interfaces/IchatService";
import IchatModel from "../interfaces/IchatModel";
import ImessageModel from "../interfaces/ImessageModel";
import IchatRepository from "../interfaces/IchatRepository";
import ImessageRepository from "../interfaces/ImessageRepository";

export class chatService implements IchatService {
  private _chatRepository: IchatRepository;
  private _messageRepository: ImessageRepository;

  constructor(
    chatRepository: IchatRepository,
    messageRepository: ImessageRepository
  ) {
    this._chatRepository = chatRepository;
    this._messageRepository = messageRepository;
  }
  async createChat(chatDetails: any): Promise<IchatModel | null> {
    try {
        console.log("coming to create chat-service",chatDetails);
        console.log("coming to create chat-service legth",chatDetails.chatType);
      if (!chatDetails.participants || chatDetails.participants.length < 2) {
        throw new CustomError(
          "A chat must have at least two participants",
          400
        );
      }
      
      const res = await this._chatRepository.createChat(chatDetails);
      if (res) {
        console.log("create dc hat",res);
        
        return res;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchAllChats(userId: string): Promise<IchatModel[] | null> {
    try {
      if (!userId) {
        throw new CustomError("User ID is required", 400);
      }
      const chats = await this._chatRepository.fetchAllChats(userId);
      
      if (!chats) {
        return null;
      }
      return chats;
    } catch (error) {
      console.log("Error fetching private chats:", error);
      throw error;
    }
  }
  

  async sendMessage(messageDetails: any): Promise<ImessageModel | null> {
    try {
      if (
        !messageDetails.content ||
        !messageDetails.sender ||
        !messageDetails.chatId
      ) {
        throw new CustomError("Invalid message details", 400);
      }
      console.log(messageDetails,"meyasage details-----------------");
      
      const message = await this._messageRepository.createMessage(
        messageDetails
      );
      return message;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchMessages(chatId: string): Promise<ImessageModel[] | null> {
    try {
      if (!chatId) {
        throw new CustomError("Chat ID is required", 400);
      }
      const result = await this._messageRepository.fetchMessages(chatId);
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
