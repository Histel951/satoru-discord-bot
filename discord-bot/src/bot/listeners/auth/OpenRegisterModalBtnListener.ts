import AbstractListener from "../AbstractListener";
import { ButtonInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import createInput from "../../../utils/ui/createInput";
import createModal from "../../../utils/ui/createModal";

export default class extends AbstractListener<ButtonInteraction> {

    async execute(interaction: ButtonInteraction) {
        const dotaIdInput = createInput({
            customId: 'input-dota-profile-id',
            label: 'Укажите ID профиля Dota 2:',
            style: TextInputStyle.Short,
        });

        const modal = createModal<TextInputBuilder>({
            customId: 'register-modal-submit',
            title: 'Регистрация игрока',
            rows: [dotaIdInput],
        });

        console.log('Открыть модалку.')

        return interaction.showModal(modal);
    }
}