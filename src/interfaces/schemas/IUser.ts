import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId
    discord_id: string
    player_id: {
        type: typeof Types.ObjectId
        ref: string
    }
}