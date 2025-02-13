/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "socket.io";
import http from "http";
import ImessageRepository from "../interfaces/ImessageRepository";
import { messageRepository } from "../repositories/messageRepository";
import IchatRepository from "../interfaces/IchatRepository";
import { chatRepository } from "../repositories/chatRespository";
import InotificationRepository from "../interfaces/InotificationRepository";
import { NotificationRepository } from "../repositories/notificationRepository";
import mongoose from "mongoose";
import InotificationModel from "../interfaces/INotificationModel";

const MessageRepository: ImessageRepository = new messageRepository();
const ChatRepository: IchatRepository = new chatRepository();
const NotifcationRepository: InotificationRepository =
  new NotificationRepository();
const userSockets = new Map<string, string>(); // 🔹 Store userId -> socketId mapping

export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("registerUser", (userId: string) => {
      userSockets.set(userId, socket.id);
    });

    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", async (messageData: any) => {
      try {
        const savedMessage = await MessageRepository.createMessage({
          ...messageData,
          readBy: [messageData.sender],
        });

        if (savedMessage) {
          await ChatRepository.updateChat(messageData.chatId, {
            lastMessage: savedMessage._id,
            lastMessageAt: new Date(),
          });

          io.to(messageData.chatId).emit("receiveMessage", savedMessage);

          const chatDetails = await ChatRepository.getChatById(
            messageData.chatId
          );
          if (chatDetails) {
            chatDetails.participants.forEach(async (userId) => {
              const userIdStr = userId.toString();
              if (userIdStr !== messageData.sender) {
                const receiverSocket = userSockets.get(userIdStr);
                if (receiverSocket) {
                  io.to(receiverSocket).emit("notifyUser", {
                    message: "New message received",
                    chatId: messageData.chatId,
                    sender: messageData.sender,
                  });
                }
                try {
                  const notificationDetails: Partial<InotificationModel> = {
                    sender: new mongoose.Types.ObjectId(messageData.sender),
                    reciever: new mongoose.Types.ObjectId(userIdStr),
                    message: "New message received",
                    timestamp: new Date(),
                    read: false,
                  };

                  await NotifcationRepository.createNotification(
                    notificationDetails
                  );
                } catch (err) {
                  console.error("Error saving notification:", err);
                }
              }
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      // Remove the user from the socket mapping on disconnect
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};
