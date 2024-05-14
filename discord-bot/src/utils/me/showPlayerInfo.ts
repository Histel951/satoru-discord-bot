import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { Document } from "mongoose";

export default (playerInfo: IPlayer & Document): string => {
    return `
**Имя**: \`${playerInfo.nickname}\`
**Ранг**: \`${playerInfo.rank_tier}\`
**Dota ID**: \`${playerInfo.account_id}\``;
}