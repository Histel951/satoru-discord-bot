import { PlayerType } from "../types";
import { Player } from "../database/models";
import {PlayerInterface} from "../model-interfaces";

export const createPlayer = async ({ discord_id, team = null }: PlayerType) => {
    try {
        const player = new Player({
            discord_id,
            team,
        });
        await player.save();
        return player;
    } catch (error) {
        throw new Error(`Failed to create player: ${error.message}`);
    }
};

export const findPlayerByDiscordId = async (discordId: string): Promise<PlayerInterface> => {
    try {
        return await Player.findOne<PlayerInterface>({ discord_id: discordId }).populate({
            path: 'team',
            populate: {
                path: 'owner'
            }
        }).exec();
    } catch (error) {
        throw new Error(`Failed to find player by Discord ID: ${error.message}`);
    }
};
