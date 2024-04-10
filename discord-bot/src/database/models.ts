import { Document } from "mongoose";
import mongoose from "mongoose";
import TeamSchema from "./schemas/TeamSchema";
import PlayerSchema from "./schemas/PlayerSchema";
import TournamentSchema from "./schemas/TournamentSchema";
import TeamInviteSchema from "./schemas/TeamInviteSchema";
import TournamentTeamsSchema from "./schemas/TournamentTeamsSchema";
import { ITournament } from "../interfaces/schemas/ITournament";
import { ITournamentTeams } from "../interfaces/schemas/ITournamentTeams";
import { IPlayer } from "../interfaces/schemas/IPlayer";
import { ITeam } from "../interfaces/schemas/ITeam";
import { ITeamInvite } from "../interfaces/schemas/ITeamInvite";

export const Team = mongoose.connection.model<ITeam & Document>('Team', TeamSchema);
export const Player = mongoose.connection.model<IPlayer & Document>('Player', PlayerSchema);
export const TeamInvite = mongoose.connection.model<ITeamInvite & Document>('TeamInvite', TeamInviteSchema);
export const Tournament = mongoose.connection.model<ITournament & Document>('Tournament', TournamentSchema);
export const TournamentTeams = mongoose.connection.model<ITournamentTeams & Document>('TournamentTeams', TournamentTeamsSchema);