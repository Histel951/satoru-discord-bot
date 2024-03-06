import { PlayerInfoT } from "../../types/dota/PlayerInfoT";

export default (playerInfo: PlayerInfoT): string => {
    return `
**Имя**: \`${playerInfo.personaname}\`
**Ранг**: \`${playerInfo.rank}\`
**Dota ID**: \`${playerInfo.account_id}\``;
}