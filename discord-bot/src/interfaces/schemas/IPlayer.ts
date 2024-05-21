import mongoose from "mongoose";

export interface IPlayer {
    _id: mongoose.Types.ObjectId
    discordId: string
    teamId: {
        type: mongoose.Types.ObjectId
        ref: string
        default: null
    }
    steamAccountId: string
    name: string
    lastMatchDate: number | null
    rank: number
    leaderboardRank: number|null
    position: number
}