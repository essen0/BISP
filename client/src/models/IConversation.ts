import { IMessage } from "./IMessage";

export interface IConversation {
    participants: string[]; 
    messages: IMessage[];   
    createdAt?: string;     
    updatedAt?: string;     
  }