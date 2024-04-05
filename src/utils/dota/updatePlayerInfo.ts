import { PlayerInfoT } from "../../types/dota/PlayerInfoT";
import fetchPlayerInfo from "./fetchPlayerInfo";
import { Player } from "../../database/models";
import getRankName from "./getRankName";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { Document } from "mongoose";

export default async (discordId: string, dotaId: number | string): Promise<IPlayer & Document> => {
    const playerInfo = await fetchPlayerInfo(dotaId);

    const player = await Player.findOneAndUpdate(
        { discord_id: discordId },
        {
            account_id: playerInfo.account_id,
            personaname: playerInfo.personaname,
            plus: playerInfo.plus,
            last_login: playerInfo.last_login,
            rank: getRankName(playerInfo.rank),
            leaderboard_rank: playerInfo.leaderboard_rank,
        },
        { upsert: true, new: true }
    ).exec();

    return player;
};
