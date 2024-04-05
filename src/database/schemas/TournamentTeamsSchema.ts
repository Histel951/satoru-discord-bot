import { Document, Schema, Types } from "mongoose";
import { ITournamentTeams } from "../../interfaces/schemas/ITournamentTeams";

export default new Schema<ITournamentTeams & Document>({
    tournament: {
        type: Types.ObjectId,
        ref: 'Tournament',
    },
    team: {
        type: Types.ObjectId,
        ref: 'Team',
    },
});