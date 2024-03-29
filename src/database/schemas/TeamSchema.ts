import mongoose, { Schema } from "mongoose";
import {ITeam} from "../../interfaces/schemas/ITeam";

export default new Schema<ITeam & Document>({
    name: { type: String, required: true },
    player_id: { type: mongoose.Types.ObjectId, ref: 'Player' }
})