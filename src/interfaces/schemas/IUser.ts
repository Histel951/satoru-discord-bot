import mongoose from "mongoose";

export interface IUser {
    _id: string
    discord_id: string
    player_id: {
        type: typeof mongoose.Types.ObjectId
        ref: string
    }
}