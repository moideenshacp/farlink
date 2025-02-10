import { Request, Response } from "express";
import { IchatService } from "../interfaces/IchatService";
import { CustomError } from "../errors/CustomError";
import { IchatController } from "../interfaces/IchatController";

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
        console.log("coming to create chat-controllere",chatDetails);
        const result = await this._chatService.createChat(chatDetails);

      if (result) {
        return res
          .status(201)
          .json({ message: "Chat created successfully", result });
      }
      return res.status(400).json({ message: "Failed to create chat" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  public fetchAllChats = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => { 
    try {
      const { userId } = req.query;
      console.log("user id",userId);
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const result = await this._chatService.fetchAllChats(userId as string);
  
      if (result) {
        return res.status(200).json({ message: "Chats fetched successfully", result });
      } else {
        return res.status(404).json({ message: "No private chats found" });
      }
    } catch (error) {
      console.error("Error fetching private chats:", error);
  
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
  
      res.status(500).json({ error: "Internal Server Error" });
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
          .status(201)
          .json({ message: "Message sent successfully", result });
      }
      return res.status(400).json({ message: "Failed to send message" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
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
          .status(200)
          .json({ message: "Messages fetched successfully", result });
      }else{

          return res.status(400).json({ message: "Failed to fetch messages" });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  public updateChat = async(req: Request, res: Response): Promise<Response | void> =>{
      try {
        const {chatId,updateData} = req.body
        const result = await this._chatService.updateChat(chatId,updateData)
        if (result) {
            return res
              .status(200)
              .json({ message: "Chat Updated successfully", result });
          }else{
    
              return res.status(400).json({ message: "Failed to fetch messages" });
          }
      } catch (error) {
        console.log(error);
        
      }
  }

}
