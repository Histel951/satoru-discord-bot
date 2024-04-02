import mongoose from "mongoose";

export interface IPlayer {
    _id: mongoose.Types.ObjectId
    discord_id: string
    team_id: {
        type: mongoose.Types.ObjectId
        ref: string
        default: null
    }
    account_id: string,
    role: number | null,
    personaname: string,
    plus: boolean,
    last_login: string|null,
    rank: number,
    leaderboard_rank: number|null
}