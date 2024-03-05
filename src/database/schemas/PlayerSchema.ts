import mongoose, { Schema } from "mongoose";
import { IPlayer } from "../../interfaces/schemas/IPlayer";

export default new Schema<IPlayer & Document>({
    team_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    dota_id: {
        default: null,
        type: String,
    }
})