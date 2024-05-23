import mongoose, { Document } from "mongoose";
import { ITeam } from "./ITeam";

export interface IPlayer {
    _id: mongoose.Types.ObjectId
    discordId: string
    team: {
        type: mongoose.Types.ObjectId
        ref: string
        default: null
    } & Document & ITeam
    steamAccountId: string
    name: string
    lastMatchDate: number | null
    rank: number
    leaderboardRank: number|null
    position: number
}