import mongoose from "mongoose";

export interface ITeam {
    _id: mongoose.Types.ObjectId
    name: string
    owner_id: {
        type: mongoose.Types.ObjectId
        ref: string
    }
}