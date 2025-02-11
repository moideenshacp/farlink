import IchatModel from "./IchatModel";
import ImessageModel from "./ImessageModel";
import InotificationModel from "./INotificationModel";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IchatService{
    createChat(chatDetails: any): Promise<IchatModel | null>;
    sendMessage(messageDetails: any): Promise<ImessageModel | null>;
    fetchMessages(chatId: string): Promise<ImessageModel[] | null>;
    fetchAllChats(userId: string): Promise<IchatModel[] | null>;
    updateChat(chatId: string,updateData:any): Promise<IchatModel | null>;
    fetchNotification(userId: string): Promise<InotificationModel[] | null>;
    markAllAsRead(userId: string): Promise<void>;
    clearReadNotifications(userId: string): Promise<void>;
    
}