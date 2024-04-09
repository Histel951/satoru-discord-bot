import { Schema, Types, Document } from "mongoose";
import { ITeam } from "../../interfaces/schemas/ITeam";

export default new Schema<ITeam & Document>({
    name: { type: String, required: true },
    color: { type: String, default: null },
    image_url: { type: String, default: null },
    player_id: { type: Types.ObjectId, ref: 'Player' }
})