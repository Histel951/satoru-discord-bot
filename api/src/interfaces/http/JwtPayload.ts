import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export interface JwtPayload extends jwt.JwtPayload {
    _id: Types.ObjectId
    login: string
}