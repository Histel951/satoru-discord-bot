import mongoose, { Schema } from "mongoose";

export default new Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' }
})