import { findUserByDiscordId } from "./user";

export const findPlayerByDiscordId = async (discordId: string) => {
    const user = await findUserByDiscordId(discordId)
}