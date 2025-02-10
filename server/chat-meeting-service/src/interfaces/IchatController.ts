import { Request, Response } from "express";

export  interface IchatController {
  createChat(req: Request, res: Response): Promise<Response>;
  sendMessage(req: Request, res: Response): Promise<Response>;
  fetchMessages(req: Request, res: Response): Promise<Response>;
  fetchAllChats(req: Request, res: Response): Promise<Response  | void>;
  updateChat(req: Request, res: Response): Promise<Response  | void>;
}
