import mongoose,{ Types } from 'mongoose';

export interface UserInterface{
    userName: string;
    email: string;
    password: string;
}
export interface UserData{
    _id:Types.ObjectId
    username: string;
    email: string;
    password: string;
}
export interface LoginResponse{
    data:Data
}
export interface Data{
    user:UserData
    accessToken:string
}


export interface StatusMessage{
    status: number; 
    message: string ;

}

// src/interfaces/interface.ts
export interface BookInterface {
    title: string;           // required
    author: string;          // required
    publishedYear?: number;  // optional
    genre?: string;          // optional
    stock: number;           // required, positive integer
}


export interface DecodedToken {
    userId: string;
    id: string;

}
