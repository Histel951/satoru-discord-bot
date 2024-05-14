import { Schema, Document, Types } from "mongoose";
import { IPlayer } from "../../interfaces/schemas/IPlayer";

export default new Schema<IPlayer & Document>({
    discord_id: String,
    team_id: {
        type: Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    account_id: String,
    nickname: String,
    avatar: {
        type: String,
        default: null,
    },
    plus: Boolean,
    last_login: {
        type: String,
        default: null,
    },
    rank_tier: {
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