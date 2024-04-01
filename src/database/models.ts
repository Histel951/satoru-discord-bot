import { satoroBotDb } from "./connect";
import TeamSchema from "./schemas/TeamSchema";
import UserSchema from "./schemas/UserSchema";
import PlayerSchema from "./schemas/PlayerSchema";
import { IUser } from "../interfaces/schemas/IUser";
import { IPlayer } from "../interfaces/schemas/IPlayer";
import { ITeam } from "../interfaces/schemas/ITeam";
import { ITeamInvite } from "../interfaces/schemas/ITeamInvite";
import TeamInviteSchema from "./schemas/TeamInviteSchema";

export const Team = satoroBotDb.model<ITeam & Document>('Team', TeamSchema);
export const User = satoroBotDb.model<IUser & Document>('User', UserSchema);
export const Player = satoroBotDb.model<IPlayer & Document>('Player', PlayerSchema);
export const TeamInvite = satoroBotDb.model<ITeamInvite & Document>('TeamInvite', TeamInviteSchema);