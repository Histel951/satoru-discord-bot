import { PlayerInfoT } from "../../types/dota/PlayerInfoT";

export default (playerInfo: PlayerInfoT): string => {
    return `Данные об игроке обновились: 

**Имя**: \`${playerInfo.personaname}\`
**Ранг**: \`${playerInfo.rank}\``;
}