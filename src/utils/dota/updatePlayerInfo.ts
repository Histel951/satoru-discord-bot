import { PlayerInfoT } from "../../types/dota/PlayerInfoT";
import fetchPlayerInfo from "./fetchPlayerInfo";
import { Player } from "../../database/models";
import {IPlayer} from "../../interfaces/schemas/IPlayer";
import {RanksEnum} from "../../enums/RanksEnum";

export default async (dotaId: number|string): Promise<[PlayerInfoT, IPlayer & Document]> => {
    const playerInfo = await fetchPlayerInfo(dotaId);

    const player = new Player({
        account_id: playerInfo.account_id,
        personaname: playerInfo.personaname,
        plus: playerInfo.plus,
        last_login: playerInfo.last_login,
        rank: RanksEnum[playerInfo.rank],
        leaderboard_rank: playerInfo.leaderboard_rank
    });

    await player.save();

    return [playerInfo, player];
}