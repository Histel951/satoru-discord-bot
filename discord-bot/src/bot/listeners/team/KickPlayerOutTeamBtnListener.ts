import AbstractListener from "../AbstractListener";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { InteractionT } from "../../../types/InteractionT";
import { Player } from "../../../database/models";
import createBtn from "../../../utils/ui/createBtn";

export default class extends AbstractListener<ButtonInteraction> {

    async execute(interaction: ButtonInteraction & InteractionT) {
        const player = await Player.findOne({
            discordId: interaction.user.id,
        }).exec();

        const backRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                createBtn({
                    label: 'Назад',
                    customId: 'team-info-btn-update',
                    style: ButtonStyle.Primary,
                }),
            );

        if (!player) {
            await interaction.update({
                content: 'Игрок не найден.',
                components: [backRow],
                embeds: [],
            });

            return;
        }

        const players = await Player.find({
            team: player.team,
        }).exec();

        const btns: ButtonBuilder[] = [];

        players.forEach(player => {
            const data = JSON.stringify({
                playerId: player._id,
                name: player.name,
            });

            const kickPlayerButton = createBtn({
                label: player.name,
                customId: `kick-player-out-team->${data}`,
                style: ButtonStyle.Danger,
            });

            btns.push(kickPlayerButton);
        });

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(btns);

        await interaction.update({
            components: [row, backRow],
            content: 'Выберите игрока которого хотите выгнать:',
            embeds: [],
        });
    }
}