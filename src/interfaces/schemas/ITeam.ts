import mongoose from "mongoose";

export interface ITeam {
    _id: string
    name: string
    owner_id: {
        type: mongoose.Types.ObjectId
        ref: string
    }
}