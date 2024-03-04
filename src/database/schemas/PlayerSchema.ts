import mongoose, { Schema } from "mongoose";

export default new Schema({
    discord_id: { type: String, require: true },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
})