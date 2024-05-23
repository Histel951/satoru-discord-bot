import { Schema, Types, Document } from "mongoose";
import { ITeam } from "../../interfaces/schemas/ITeam";

export default new Schema<ITeam & Document>({
    name: { type: String, required: true },
    image_url: { type: String, default: null },
    player_id: { type: Types.ObjectId, ref: 'Player' }
})