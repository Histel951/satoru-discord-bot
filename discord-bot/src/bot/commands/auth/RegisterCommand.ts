import { CommandInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import createInput from "../../../utils/ui/createInput";
import createModal from "../../../utils/ui/createModal";
import { Player } from "../../../database/models";
import showPlayerInfo from "../../../utils/me/showPlayerInfo";
import AbstractCommand from "../AbstractCommand";

export default class extends AbstractCommand {

    async execute(interaction: CommandInteraction) {
        const dotaIdInput = createInput({
            customId: 'input-dota-profile-id',
            label: 'Укажите ID профиля Dota 2:',
            style: TextInputStyle.Short,
        });

        const modal = createModal<TextInputBuilder>({
            customId: 'player-registration',
            title: 'Регистрация игрока',
            rows: [dotaIdInput],
        });

        return interaction.showModal(modal);
    }

    async middleware(interaction: CommandInteraction) {
        const player = await Player.findOne({
            discord_id: interaction.user.id
        }).exec();

        if (player) {
            return {
                result: false,
                interaction,
                options: {
                    content: `Вы уже зарегистрированы как:\n${showPlayerInfo(player)}`,
                    ephemeral: true,
                },
            };
        }

        return {
            result: true,
            interaction
        };
    }
}