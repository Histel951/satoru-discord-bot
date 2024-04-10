import mongoose, {Document} from "mongoose";
import {ITournament} from "../interfaces/schemas/ITournament";
import TournamentSchema from "./schemas/TournamentSchema";

export const Tournament = mongoose.connection.model<ITournament & Document>('Tournament', TournamentSchema);