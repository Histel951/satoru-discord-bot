import mongoose, { Schema } from "mongoose";

export const TeamSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: 'Player' }
})