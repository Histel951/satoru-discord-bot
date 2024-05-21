import { Player } from "../../database/models";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { Document } from "mongoose";
import { DotaApiPortI } from "../../interfaces/dota-api/DotaApiPortI";

export default async (discordId: string, dotaId: number | string, dotaApi: DotaApiPortI): Promise<IPlayer & Document> => {
    const data = await dotaApi.playerInfo(Number(dotaId));

    console.log(data);

    return await Player.findOneAndUpdate(
        { discordId: discordId },
        data,
        { upsert: true, new: true }
    ).exec();
}
