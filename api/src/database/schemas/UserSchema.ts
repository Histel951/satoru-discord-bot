import { Schema, Types, Document } from "mongoose";
import { IUser } from "../../interfaces/schemas/IUser";

export default new Schema<IUser & Document>({
    login: { type: String, required: true },
    password: { type: String, required: true },
})