import { Player } from "../../database/models";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { Document } from "mongoose";
import { DotaApiPortI } from "../../interfaces/dota-api/DotaApiPortI";

export default async (discordId: string, dotaId: number | string, dotaApi: DotaApiPortI): Promise<IPlayer & Document> =>
    await Player.findOneAndUpdate(
        { discord_id: discordId },
        await dotaApi.playerInfo(Number(dotaId)),
        { upsert: true, new: true }
    ).exec();
