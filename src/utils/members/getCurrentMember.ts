import { BaseInteraction } from "discord.js";

export default async (interaction: BaseInteraction) => await interaction.guild?.members.fetch(interaction.user.id);