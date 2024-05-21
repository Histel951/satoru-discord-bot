import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { Document } from "mongoose";

export default (playerInfo: IPlayer & Document): string => {
    return `
**Имя**: \`${playerInfo.name}\`
**Ранг**: \`${playerInfo.rank}\`
**Dota ID**: \`${playerInfo.steamAccountId}\``;
}