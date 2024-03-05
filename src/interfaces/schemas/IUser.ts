import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId
    discord_id: string
    player_id: {
        type: typeof mongoose.Types.ObjectId
        ref: string
    }
}