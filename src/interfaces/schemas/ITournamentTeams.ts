import { Types } from "mongoose";
import { ITournament } from "./ITournament";
import { ITeam } from "./ITeam";

export interface ITournamentTeams {
    tournament: {
        type: Types.ObjectId,
        ref: 'Tournament',
    } | ITournament,
    team: {
        type: Types.ObjectId,
        ref: 'Team',
    } | ITeam,
}