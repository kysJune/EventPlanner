import { ObjectId } from "mongoose";


export interface UserResponse{
    id: ObjectId;
    username: string;
    password: string;
    location?: string;
}