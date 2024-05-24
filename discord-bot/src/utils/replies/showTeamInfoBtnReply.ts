import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, InteractionResponse } from "discord.js";
import { Player } from "../../database/models";
import createBtn from "../ui/createBtn";
import getTeamInfoEmbed from "../team/getTeamInfoEmbed";

export default async (interaction: ButtonInteraction, isUpdate: boolean = false): Promise<InteractionResponse|void> => {
    const player = await Player.findOne({
        discordId: interaction.user.id
    }).populate('team').exec();

    if (!player?.team) {
        const response = await interaction.reply({
            content: 'Вы не состоите в команде или она не найдена.',
            ephemeral: true,
        });

        setTimeout(async () => await response.delete(), 5000);

        return;
    }

    const kickPlayerBtn = createBtn({
        customId: 'kick-player-out-team-btn',
        label: 'Кикнуть игрока',
        style: ButtonStyle.Danger,
    });

    const invitePlayerBtn = createBtn({
        customId: 'invite-player-in-team-btn',
        label: 'Пригласить игрока',
        style: ButtonStyle.Primary,
    });

    const editInfoBtn = createBtn({
        customId: 'edit-team-info-btn',
        label: 'Редактировать',
        style: ButtonStyle.Primary,
    });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(kickPlayerBtn, invitePlayerBtn);

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(editInfoBtn);

    if (isUpdate) {
        await interaction.update({
            embeds: [await getTeamInfoEmbed(player.team, interaction)],
            components: [row, row2],
            content: '',
        });
    } else {
        return await interaction.reply({
            embeds: [await getTeamInfoEmbed(player.team, interaction)],
            ephemeral: true,
            components: [row, row2]
        });
    }
}