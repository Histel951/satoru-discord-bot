import { CommandInteraction, GuildMember, InteractionResponse } from "discord.js";
import { Player } from "../../../../database/models";

export default async (interaction: CommandInteraction, { member }: { member: GuildMember }): Promise<InteractionResponse|void> => {
    await Player.updateOne({
        discord_id: member.user.id,
    }, {
        team_id: null,
    });

    await interaction.reply({
        content: `Игрок ${member.user.username} был удалён из команды.`,
        ephemeral: true,
    });
}