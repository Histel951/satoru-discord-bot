import AbstractDataListener from "../AbstractDataListener";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import createBtn from "../../../utils/ui/createBtn";
import { Player } from "../../../database/models";

type DataT = { playerId: number, name: string };

export default class extends AbstractDataListener<ButtonInteraction, DataT> {

    async execute(interaction: ButtonInteraction): Promise<void> {
        const data = this.getData();

        await Player.updateOne({
            _id: data.playerId,
        }, {
            team: null,
        }).exec();

        const backRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                createBtn({
                    label: 'Назад',
                    customId: 'team-info-btn-update',
                    style: ButtonStyle.Primary,
                }),
            );

        await interaction.update({
            components: [backRow],
            content: `Вы выгнали игрока **${data.name}** из команды.`
        });
    }
}