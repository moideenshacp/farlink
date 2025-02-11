/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "socket.io";
import http from "http";
import ImessageRepository from "../interfaces/ImessageRepository";
import { messageRepository } from "../repositories/messageRepository";
import IchatRepository from "../interfaces/IchatRepository";
import { chatRepository } from "../repositories/chatRespository";

const MessageRepository: ImessageRepository = new messageRepository();
const ChatRepository: IchatRepository = new chatRepository();
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
    console.log("User Connected:", socket.id);

    socket.on("registerUser", (userId: string) => {
      userSockets.set(userId, socket.id);
      console.log(`User ${userId} is mapped to socket ${socket.id}`);
    });

    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined chat room: ${chatId}`);
    });

    socket.on("sendMessage", async (messageData: any) => {
      console.log(messageData, "message-----");
      try {
        const savedMessage = await MessageRepository.createMessage({
          ...messageData,
          readBy: [messageData.sender],
        });

        if (savedMessage) {
          console.log(savedMessage, "saved");

          await ChatRepository.updateChat(messageData.chatId, {
            lastMessage: savedMessage._id,
            lastMessageAt: new Date(),
          });

          console.log("Message saved & last message updated:", savedMessage);
          io.to(messageData.chatId).emit("receiveMessage", savedMessage);

          const chatDetails = await ChatRepository.getChatById(messageData.chatId);
          if (chatDetails) {
            chatDetails.participants.forEach((userId) => {
                console.log("loiiiiii-------------------------------");
                
              const userIdStr = userId.toString();
              if (userIdStr !== messageData.sender) {
                console.log(userIdStr,"userIdStr----------------");
                
                const receiverSocket = userSockets.get(userIdStr);
                console.log("reciever socket---------------------",receiverSocket);
                if (receiverSocket) {
                    
                  io.to(receiverSocket).emit("notifyUser", {
                    message: "New message received",
                    chatId: messageData.chatId,
                    sender: messageData.sender,
                  });
                  console.log(`Notification sent to user ${userIdStr}`);
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
      console.log("User disconnected:", socket.id);

      // Remove the user from the socket mapping on disconnect
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          console.log(`User ${userId} removed from socket mapping.`);
          break;
        }
      }
    });
  });

  return io;
};
