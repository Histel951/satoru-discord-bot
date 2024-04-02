import mongoose from "mongoose";
import { ColorResolvable } from "discord.js";

export interface ITeam {
    _id: mongoose.Types.ObjectId
    name: string
    image_url: string
    color: ColorResolvable | null
    player_id: {
        type: mongoose.Types.ObjectId
        ref: string
    }
}