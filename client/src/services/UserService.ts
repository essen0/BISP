import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IUserProfile } from "../models/IUserProfile"; 
import { promises } from "dns";

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
            throw error;  // Make sure to rethrow the error for further handling
        });
    }
}

