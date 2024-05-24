import { Player } from "../../database/models";
import { IPlayer } from "../../interfaces/schemas/IPlayer";
import { Document } from "mongoose";
import createDotaApiPort from "../dota-api/createDotaApiPort";

export default async (discordId: string, dotaId: number | string): Promise<IPlayer & Document> => {
    const dotaApi = createDotaApiPort();
    const data = await dotaApi.playerInfo(Number(dotaId));

    return await Player.findOneAndUpdate(
        { discordId },
        data,
        { upsert: true, new: true },
    ).exec();
}
