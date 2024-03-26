import {PlayerInfoT} from "../../types/dota/PlayerInfoT";
import {Player} from "../../database/models";
import {IPlayer} from "../../interfaces/schemas/IPlayer";
import getRankName from "./getRankName";

export default async (discordId: string): Promise<PlayerInfoT | undefined> => {
    const player = (await Player.findOne<IPlayer>({ discord_id: discordId }).exec()) as Document & IPlayer;

    return player ? {
        account_id: player.account_id,
        personaname: player.personaname,
        plus: player.plus,
        last_login: player.last_login,
        rank: getRankName(player.rank),
        leaderboard_rank: player.leaderboard_rank,
        team_id: player.team_id as unknown as string,
    } : undefined;
};