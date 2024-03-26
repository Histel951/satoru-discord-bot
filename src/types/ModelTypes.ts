import mongoose from "mongoose";

export type CreateUserT = {
    discord_id: string
    player_id: mongoose.Types.ObjectId | null
}

export type CreateTeamT = {
    discord_id: string
    name: string
    avatar_url?: string
}