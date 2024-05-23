import AbstractListener from "../AbstractListener";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";
import { Player } from "../../../database/models";
import getTeamInfoEmbed from "../../../utils/team/getTeamInfoEmbed";
import createBtn from "../../../utils/ui/createBtn";

export default class extends AbstractListener<ButtonInteraction> {

    async execute(interaction: ButtonInteraction & InteractionT) {
        const player = await Player.findOne({
            discordId: interaction.user.id
        }).populate('team').exec();

        if (!player?.team) {
            return await interaction.reply({
                content: 'Вы не состоите в команде или она не найдена.',
                ephemeral: true,
            });
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

        await interaction.reply({
            embeds: [await getTeamInfoEmbed(player.team)],
            ephemeral: true,
            components: [row, row2]
        });
    }
}