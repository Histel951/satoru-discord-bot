import mongoose, { Document } from "mongoose";
import { ITournament } from "../interfaces/schemas/ITournament";
import TournamentSchema from "./schemas/TournamentSchema";
import { IUser } from "../interfaces/schemas/IUser";
import UserSchema from "./schemas/UserSchema";

export const Tournament = mongoose.connection.model<ITournament & Document>('Tournament', TournamentSchema);
export const User = mongoose.connection.model<IUser & Document>('User', UserSchema);