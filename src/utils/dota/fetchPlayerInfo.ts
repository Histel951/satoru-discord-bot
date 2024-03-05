import { PlayerDotaInfoResponseT } from "../../types/dota/PlayerDotaInfoResponseT";
import openDotaAxios from "../../axios/openDotaAxios";
import { PlayerInfoT } from "../../types/dota/PlayerInfoT";
import {RanksEnum, RanksT} from "../../enums/RanksEnum";

export default async (dotaId: number|string): Promise<PlayerInfoT> => {
    const { data } = await openDotaAxios.get<PlayerDotaInfoResponseT>(`/players/${dotaId}`);

    return {
        account_id: data.profile.account_id,
        personaname: data.profile.personaname,
        name: data.profile.name,
        plus: data.profile.plus,
        last_login: data.profile.last_login,
        rank: RanksEnum[data.rank_tier] as RanksT,
        leaderboard_rank: data.leaderboard_rank,
    };
};