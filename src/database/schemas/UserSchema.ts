import mongoose, { Schema } from "mongoose";
import {IUser} from "../../interfaces/schemas/IUser";

export default new Schema<IUser & Document>({
    discord_id: { type: String, required: true },
    player_id: { type: mongoose.Types.ObjectId, ref: 'Player' }
})