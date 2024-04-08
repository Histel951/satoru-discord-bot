import { Schema, Types, Document } from "mongoose";
import { ITeamInvite } from "../../interfaces/schemas/ITeamInvite";

export default new Schema<ITeamInvite & Document>({
    team_id: {
        type: Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    role: { type: Number, required: true },
    player_id: {
        type: Types.ObjectId,
        ref: 'Player',
        required: true,
    }
});