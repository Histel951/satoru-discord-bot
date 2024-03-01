import {satoroBotDb} from "./connect";
import {TeamSchema} from "./schemas/TeamSchema";
import {PlayerSchema} from "./schemas/PlayerSchema";

export const Team = satoroBotDb.model('Team', TeamSchema)
export const Player = satoroBotDb.model('Player', PlayerSchema)