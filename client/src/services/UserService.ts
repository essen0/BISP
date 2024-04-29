import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IUserProfile } from "../models/IUserProfile"; 
import { promises } from "dns";
import { IMessage } from "../models/IMessage";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    static async fetchUserProfileService(): Promise<AxiosResponse<IUserProfile>> {
        try {
            const response = await $api.get<IUserProfile>(`/profile`);
            return response;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;  // Re-throw the error to handle it further up the call stack
        }
    }
    static  updateUserProfile(firstName: string, secondName: string, idNumber:string, gender: string, age: string, address:string, telephoneNumber:string): Promise<AxiosResponse<IUserProfile>>{
        return $api.put<IUserProfile>('/profile', {firstName, secondName, idNumber, gender, age, address, telephoneNumber})
    }
    static async deleteAccount(): Promise<void> {
        return $api.delete('/delete-account').then(response => {
            console.log('Account deleted successfully:', response.data);
        }).catch(error => {
            console.error('Error deleting account:', error);
            throw error;  
        });
    }
    static async getDoctorsChat(): Promise<AxiosResponse<IUser[]>>{
        try {
            const response = await $api.get<IUser[]>('/message/getDoctorChat')
            return response
        } catch (e) {
            console.log(e);
            throw e
        }
    }
    static async sendMessage(userId: string, message: String): Promise<AxiosResponse<IMessage> | undefined> {
        try {
          const response = await $api.post<IMessage>(`/messages/send/${userId}`, { message });
          return response;
        } catch (e) {
          console.log(e);
          return undefined;
        }
      }
      static async getMessages(userId:string): Promise<AxiosResponse<IMessage[]>>{
        const response = await $api.get<IMessage[]>(`/messages/${userId}`)
        return response
      }
}

