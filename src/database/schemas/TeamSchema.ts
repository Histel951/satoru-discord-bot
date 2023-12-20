import mongoose, { Schema } from "mongoose";
import {PlayerSchema} from "./PlayerSchema";

export const TeamSchema = new Schema({
    name: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Players'
    }
})