import { CommandType } from "../types/CommandTypes";
import {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} from "discord.js";
import handleError from "../utils/handleError";
import createBtn from "../utils/ui/createBtn";

const buttons = [
    createBtn({ customId: 'team-create-btn', label: 'Создать команду', style: ButtonStyle.Success }),
    createBtn({ customId: 'add-members-to-team', label: 'Добавить участников', style: ButtonStyle.Secondary }),
    createBtn({ customId: 'team-info-btn', label: 'Информация', style: ButtonStyle.Secondary }),
];

export const TeamCommand: CommandType = {
    name: 'team',
    description: 'Действия связанные с командой',
    execute: async interaction => {
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)

        await interaction.reply({
            content: 'Выберите действие:',
            components: [row],
            ephemeral: true
        });
    }
}; 