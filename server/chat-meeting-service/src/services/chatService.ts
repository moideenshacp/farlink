/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError } from "../errors/CustomError";
import { IchatService } from "../interfaces/IchatService";
import IchatModel from "../interfaces/IchatModel";
import ImessageModel from "../interfaces/ImessageModel";
import IchatRepository from "../interfaces/IchatRepository";
import ImessageRepository from "../interfaces/ImessageRepository";
import InotificationRepository from "../interfaces/InotificationRepository";
import InotificationModel from "../interfaces/INotificationModel";
import { HttpStatusCode } from "../constants/HttpStatusCode";

export class chatService implements IchatService {
  private _chatRepository: IchatRepository;
  private _messageRepository: ImessageRepository;
  private _notificationRepository: InotificationRepository;

  constructor(
    chatRepository: IchatRepository,
    messageRepository: ImessageRepository,
    notificationRepository: InotificationRepository
  ) {
    this._chatRepository = chatRepository;
    this._messageRepository = messageRepository;
    this._notificationRepository = notificationRepository;
  }
  async createChat(chatDetails: any): Promise<IchatModel | null> {
    try {
      if (!chatDetails.participants || chatDetails.participants.length < 2) {
        throw new CustomError(
          "A chat must have at least two participants",
          HttpStatusCode.BAD_REQUEST
        );
      }

      const res = await this._chatRepository.createChat(chatDetails);
      if (res) {
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
        throw new CustomError("User ID is required", HttpStatusCode.BAD_REQUEST);
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
        throw new CustomError("Invalid message details", HttpStatusCode.BAD_REQUEST);
      }
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
        throw new CustomError("Chat ID is required", HttpStatusCode.BAD_REQUEST);
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
  async updateChat(
    chatId: string,
    updateData: any
  ): Promise<IchatModel | null> {
    try {
      const updated = await this._chatRepository.updateChat(chatId, updateData);
      if (updated) {
        return updated;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchNotification(
    userId: string
  ): Promise<InotificationModel[] | null> {
    try {
      const result =
        await this._notificationRepository.getNotificationsByUserId(userId);
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
  async markAllAsRead(userId: string): Promise<void> {
      try {
        await this._notificationRepository.markAllAsRead(userId)
      } catch (error) {
        console.log(error);
        throw error
        
      }
  }
  async clearReadNotifications(userId: string): Promise<void> {
    try {
      await this._notificationRepository.clearReadNotifications(userId)
    } catch (error) {
      console.log(error);
      throw error
      
    }
}
}
