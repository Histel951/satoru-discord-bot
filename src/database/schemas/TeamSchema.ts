import mongoose, { Schema } from "mongoose";

export default new Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: 'Player' }
})