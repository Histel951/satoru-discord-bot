import { Schema, Document, Types } from "mongoose";
import { IPlayer } from "../../interfaces/schemas/IPlayer";

export default new Schema<IPlayer & Document>({
    discord_id: { type: String, required: true },
    team_id: {
        type: Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    account_id: {
        type: String,
        required: true,
    },
    personaname: {
        type: String,
        required: true,
    },
    plus: {
        type: Boolean,
        default: false,
    },
    last_login: {
        type: String,
        default: null,
    },
    rank: {
        type: Number,
        default: null,
    },
    leaderboard_rank: {
        type: Number,
        default: null
    },
    role: {
        type: Number,
        default: null,
    }
})