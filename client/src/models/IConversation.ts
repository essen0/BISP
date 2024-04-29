import { IMessage } from "./IMessage";

export interface IConversation {
    participants: string[]; // Array of participant IDs as strings
    messages: IMessage[];   // Array of messages
    createdAt?: string;     // ISO string of the creation date
    updatedAt?: string;     // ISO string of the last update date
  }