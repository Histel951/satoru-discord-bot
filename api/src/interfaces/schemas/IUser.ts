import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId
    login: string
    password: string
}