import { Router } from "express";
import { messageRepository } from "../repositories/messageRepository";
import IchatRepository from "../interfaces/IchatRepository";
import { chatRepository } from "../repositories/chatRespository";
import ImessageRepository from "../interfaces/ImessageRepository";
import { IchatService } from "../interfaces/IchatService";
import { IchatController } from "../interfaces/IchatController";
import { chatService } from "../services/chatService";
import { chatController } from "../controllers/chatController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const chatRepo:IchatRepository = new chatRepository();
const messageRepo:ImessageRepository = new messageRepository();

const ChatService:IchatService = new chatService(chatRepo,messageRepo)
const ChatController:IchatController = new chatController(ChatService)

router.post("/create-chat",authenticate, ChatController.createChat);
router.get("/fetch-chat", ChatController.fetchAllChats);
router.post("/send-message",authenticate, ChatController.sendMessage);
router.get("/messages", authenticate,ChatController.fetchMessages);

export default router;
