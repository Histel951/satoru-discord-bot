import mongoose from "mongoose";

export interface IPlayer {
    _id: string
    team_id: {
        type: mongoose.Types.ObjectId
        ref: string
        default: null
    }
    dota_id: string
}