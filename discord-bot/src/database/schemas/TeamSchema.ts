import { Schema, Types, Document } from "mongoose";
import { ITeam } from "../../interfaces/schemas/ITeam";

export default new Schema<ITeam & Document>({
    name: String,
    image_url: { type: String, default: null },
    owner: { type: Types.ObjectId, ref: 'Player' },
    ratingPoints: { type: Number, default: 0},
});