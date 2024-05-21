import { DotaPlayerApiAdapter } from "../../../interfaces/dota-api/DotaPlayerApiAdapter";
import { PlayerInfoStratzResponseT } from "../../../types/dota-api/open-dota/responses/PlayerInfoStratzResponseT";
import { PlayerInfoT } from "../../../types/dota-api/adapter/PlayerInfoT";

export default class implements DotaPlayerApiAdapter<PlayerInfoStratzResponseT> {
    playerInfo(response: PlayerInfoStratzResponseT): PlayerInfoT {
        return {
            steamAccountId: response.data.player.steamAccount.id,
            name: response.data.player.names[0].name,
            rank: response.data.player.performance.rank,
            leaderboardRank: response.data.player.leaderboardRanks[0]?.rank ?? [],
            lastMatchDate: response.data.player.lastMatchDate,
        };
    }
}