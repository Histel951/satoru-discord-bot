import mongoose, { Schema } from "mongoose";

export const PlayerSchema = new Schema({
    discord_id: String,
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Teams'
    },
    fantasy_points: Number,
})