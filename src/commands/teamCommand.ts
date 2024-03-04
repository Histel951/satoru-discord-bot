import { CommandType } from "../types/CommandTypes";
import {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} from "discord.js";
import handleError from "../utils/handleError";
import createBtn from "../utils/ui/createBtn";

const buttons = [
    createBtn('team-create-btn', 'Создать команду', ButtonStyle.Success),
    createBtn('add-members-to-team', 'Добавить участников', ButtonStyle.Secondary),
    createBtn('team-info-btn', 'Информация', ButtonStyle.Secondary),
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