import {CommandType} from "../types/CommandTypes";
import createInput from "../utils/ui/createInput";
import {TextInputBuilder, TextInputStyle} from "discord.js";
import createModal from "../utils/ui/createModal";

export const registerCommand: CommandType = {
    name: 'register',
    description: 'Зарегистрироваться на сервере как игрок',
    execute: interaction => {
        const dotaIdInput = createInput({
            customId: 'input-dota-profile-id',
            label: 'Укажите id профиля доты:',
            style: TextInputStyle.Short,
        });

        const modal = createModal<TextInputBuilder>({
            customId: 'player-registration',
            title: 'Регистрация',
            rows: [dotaIdInput],
        });

        return interaction.showModal(modal);
    }
}