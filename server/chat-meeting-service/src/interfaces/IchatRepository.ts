/* eslint-disable @typescript-eslint/no-explicit-any */
import IchatModel from "./IchatModel";

export default interface IchatRepository{
    createChat(chatDetails: any): Promise<IchatModel | null>
    fetchAllPrivateChats(userId: string): Promise<IchatModel[] | null>
    fetchAllChats(userId: string): Promise<IchatModel[] | null> 
    updateChat(chatId: string, updateData: any):Promise<IchatModel| null>
    getChatById(chatId: string): Promise<IchatModel | null>
}