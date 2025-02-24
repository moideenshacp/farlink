import { Request, Response } from "express";
import { IchatService } from "../interfaces/IchatService";
import { CustomError } from "../errors/CustomError";
import { IchatController } from "../interfaces/IchatController";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class chatController implements IchatController {
  private _chatService: IchatService;

  constructor(_chatService: IchatService) {
    this._chatService = _chatService;
  }

  public createChat = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const chatDetails = req.body;
      const result = await this._chatService.createChat(chatDetails);

      if (result) {
        return res
          .status(HttpStatusCode.CREATED)
          .json({ message: MessageConstants.CHAT_CREATED, result });
      }
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchAllChats = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: MessageConstants.BAD_REQUEST });
      }

      const result = await this._chatService.fetchAllChats(userId as string);

      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.CHAT_FETCHED, result });
      } else {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: MessageConstants.NOT_FOUND });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };

  public sendMessage = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { content, sender, chatId } = req.body;
      const result = await this._chatService.sendMessage({
        content,
        sender,
        chatId,
      });

      if (result) {
        return res
          .status(HttpStatusCode.CREATED)
          .json({ message: MessageConstants.MESSAGE_SENT, result });
      }
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };

  public fetchMessages = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { chatId } = req.query;
      const result = await this._chatService.fetchMessages(chatId as string);

      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.MESSAGE_FETCHED, result });
      } else {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message:MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public updateChat = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { chatId, updateData } = req.body;
      const result = await this._chatService.updateChat(chatId, updateData);
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.CHAT_UPDATED, result });
      } else {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchNotification = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { userId } = req.query;
      const result = await this._chatService.fetchNotification(
        userId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.NOTIFICATION_FETCHED, result });
      } else {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public markAllAsRead = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { userId } = req.body;
      await this._chatService.markAllAsRead(userId);
      return res
        .status(HttpStatusCode.OK)
        .json({ message: MessageConstants.UPDATE_NOTIFICATION });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public clearReadNotifications = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { userId } = req.body;
      await this._chatService.clearReadNotifications(userId);
      return res
        .status(HttpStatusCode.OK)
        .json({ message: MessageConstants.NOTIFICATION_CLEARED });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
}
