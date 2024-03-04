import { User } from "../database/models";
import { PlayerT } from "../types/ModelTypes";
import handleError from "./handleError";

export const createUser = async ({ discord_id, team = null }: PlayerT) => {
    try {
        const user = new User({
            discord_id,
            team,
        });
        await user.save();
        return user;
    } catch (e) {
        throw new Error(`Failed to create player: ${handleError(e as Error)}.`);
    }
};

export const findUserByDiscordId = async (discordId: string): Promise<PlayerT | null> => {
    try {
        return await User.findOne<PlayerT>({ discord_id: discordId }).populate({
            path: 'team',
            populate: {
                path: 'owner'
            }
        }).exec();
    } catch (e) {
        throw new Error(`Failed to find player by Discord ID: ${handleError(e as Error)}.`);
    }
};
