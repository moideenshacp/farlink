import ImessageModel from "./ImessageModel";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ImessageRepository{
    createMessage(messageDetails: any): Promise<ImessageModel | null>
    fetchMessages(chatId: string): Promise<ImessageModel[] | null> 
}