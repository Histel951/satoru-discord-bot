import { Player } from "../database/models";
import { PlayerT } from "../types/ModelTypes";
import handleError from "./handleError";

export const createPlayer = async ({ discord_id, team = null }: PlayerT) => {
    try {
        const player = new Player({
            discord_id,
            team,
        });
        await player.save();
        return player;
    } catch (error) {
        throw new Error(`Failed to create player: ${handleError(error as Error)}.`);
    }
};

export const findPlayerByDiscordId = async (discordId: string): Promise<PlayerT | null> => {
    try {
        return await Player.findOne<PlayerT>({ discord_id: discordId }).populate({
            path: 'team',
            populate: {
                path: 'owner'
            }
        }).exec();
    } catch (error) {
        throw new Error(`Failed to find player by Discord ID: ${handleError(error as Error)}.`);
    }
};
