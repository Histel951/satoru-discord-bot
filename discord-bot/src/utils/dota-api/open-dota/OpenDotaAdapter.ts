import { DotaPlayerApiAdapter } from "../../../interfaces/dota-api/DotaPlayerApiAdapter";
import { PlayerInfoT } from "../../../types/dota-api/adapter/PlayerInfoT";
import { PlayerInfoOpenDotaResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoOpenDotaResponseT";

export default class implements DotaPlayerApiAdapter<PlayerInfoOpenDotaResponseT> {
    playerInfo(response: PlayerInfoOpenDotaResponseT): PlayerInfoT {
        return {
            steamAccountId: response.profile.account_id,
            name: response.profile.personaname,
            rank: response.rank_tier,
            leaderboardRank: response.leaderboard_rank,
            lastMatchDate: null
        };
    }
}