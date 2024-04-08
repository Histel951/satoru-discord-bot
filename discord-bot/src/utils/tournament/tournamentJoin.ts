import { ITeam } from "../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import { ITournament } from "../../interfaces/schemas/ITournament";
import { TournamentTeams } from "../../database/models";

export default async (team: ITeam & Document, tournament: ITournament & Document) => await new TournamentTeams({
    team,
    tournament,
}).save();