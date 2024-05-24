import AbstractDataListener from "../AbstractDataListener";
import { ButtonInteraction } from "discord.js";
import { Player } from "../../../database/models";
import createShowTeamInfoRow from "../../../utils/ui/rows/createShowTeamInfoRow";

type DataT = { playerId: number, name: string };

export default class extends AbstractDataListener<ButtonInteraction, DataT> {

    async execute(interaction: ButtonInteraction): Promise<void> {
        const data = this.getData();

        await Player.updateOne({
            _id: data.playerId,
        }, {
            team: null,
        }).exec();

        const backRow = createShowTeamInfoRow('Назад', 'update');

        await interaction.update({
            components: [backRow],
            content: `Вы выгнали игрока **${data.name}** из команды.`
        });
    }
}