export interface IUser {
    email: string;
    isActivated: boolean;
    _id: string;
    role: 'patient' | 'doctor';
}