import { User } from "../database/models";
import { CreateUserT } from "../types/ModelTypes";
import handleError from "./handleError";
import {IUser} from "../interfaces/schemas/IUser";

export const createUser = async ({ discord_id, player_id = null }: CreateUserT): Promise<IUser & Document | null> => {
    try {
        const user = new User({
            discord_id,
            player_id,
        });
        await user.save();

        return user;
    } catch (e) {
        throw new Error(`Failed to create player: ${handleError(e as Error)}.`);
    }
};

export const findUserByDiscordId = async (discordId: string): Promise<IUser & Document | null> => {
    try {
        return await User.findOne({ discord_id: discordId }).populate({
            path: 'player_id',
        }).exec();
    } catch (e) {
        throw new Error(`Failed to find player by Discord ID: ${handleError(e as Error)}.`);
    }
};
