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
import InotificationRepository from "../interfaces/InotificationRepository";
import { NotificationRepository } from "../repositories/notificationRepository";

const router = Router();
const chatRepo:IchatRepository = new chatRepository();
const messageRepo:ImessageRepository = new messageRepository();
const notificationRepo:InotificationRepository = new NotificationRepository();

const ChatService:IchatService = new chatService(chatRepo,messageRepo,notificationRepo)
const ChatController:IchatController = new chatController(ChatService)

router.post("/create-chat",authenticate, ChatController.createChat);
router.post("/update-chat",authenticate, ChatController.updateChat);
router.get("/fetch-chat", ChatController.fetchAllChats);
router.post("/send-message",authenticate, ChatController.sendMessage);
router.get("/fetch-messages", authenticate,ChatController.fetchMessages);
router.get("/fetch-notification", authenticate,ChatController.fetchNotification);
router.put("/mark-as-read", authenticate,ChatController.markAllAsRead);
router.delete("/clearNotifications", authenticate,ChatController.clearReadNotifications);

export default router;
