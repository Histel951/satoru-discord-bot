import { ButtonInteraction } from "discord.js";
import { HandleResponse } from "../types/HandleTypes";
import { findUserByDiscordId } from "../utils/user";

export default async (interaction: ButtonInteraction): HandleResponse => {
    const user = await findUserByDiscordId(interaction.user.id);


}