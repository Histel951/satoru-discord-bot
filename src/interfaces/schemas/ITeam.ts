import mongoose from "mongoose";

export interface ITeam {
    _id: mongoose.Types.ObjectId
    name: string
    player_id: {
        type: mongoose.Types.ObjectId
        ref: string
    }
}