import { BaseInteraction, GuildMember } from "discord.js";

export default async (interaction: BaseInteraction): Promise<GuildMember | undefined> =>
    await interaction.guild?.members.fetch(interaction.user.id);