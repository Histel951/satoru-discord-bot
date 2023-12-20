import {satoroBotDb} from "./connect";
import {TeamSchema} from "./schemas/TeamSchema";
import {PlayerSchema} from "./schemas/PlayerSchema";

export const Teams = satoroBotDb.model('Teams', TeamSchema)
export const Players = satoroBotDb.model('Players', PlayerSchema)