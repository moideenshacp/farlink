/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "socket.io";
import http from "http";
import ImessageRepository from "../interfaces/ImessageRepository";
import { messageRepository } from "../repositories/messageRepository";
import IchatRepository from "../interfaces/IchatRepository";
import { chatRepository } from "../repositories/chatRespository";


const MessageRepository:ImessageRepository = new messageRepository()
const ChatRepository:IchatRepository = new chatRepository()
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

    socket.on("joinRoom", (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined chat room: ${chatId}`);
    });

    socket.on("sendMessage",async (messageData: any) => {
        console.log(messageData,"mesage-----");
        try {
            const savedMessage = await MessageRepository.createMessage({
                ...messageData,
                readBy: [messageData.sender]
            }) 
            if(savedMessage){
                console.log(savedMessage,"savedd");
                
                await ChatRepository.updateChat(messageData.chatId, {
                    lastMessage: savedMessage._id, 
                    lastMessageAt: new Date(),
                  });
            
                  console.log("Message saved & last message updated:", savedMessage);
                  io.to(messageData.chatId).emit("receiveMessage", savedMessage);
            }
        } catch (error) {
            console.log(error);
               
        }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
