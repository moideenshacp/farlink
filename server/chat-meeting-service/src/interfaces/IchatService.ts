import IchatModel from "./IchatModel";
import ImessageModel from "./ImessageModel";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IchatService{
    createChat(chatDetails: any): Promise<IchatModel | null>;
    sendMessage(messageDetails: any): Promise<ImessageModel | null>;
    fetchMessages(chatId: string): Promise<ImessageModel[] | null>;
    fetchAllChats(userId: string): Promise<IchatModel[] | null>;
    
}