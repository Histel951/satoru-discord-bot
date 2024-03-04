import { satoroBotDb } from "./connect";
import TeamSchema from "./schemas/TeamSchema";
import UserSchema from "./schemas/UserSchema";
import PlayerSchema from "./schemas/PlayerSchema";

export const Team = satoroBotDb.model('Team', TeamSchema)
export const User = satoroBotDb.model('User', UserSchema)
export const Player = satoroBotDb.model('Player', PlayerSchema)