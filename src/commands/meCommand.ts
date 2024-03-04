import {CommandType} from "../types/CommandTypes";
import createBtn from "../utils/ui/createBtn";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";

const buttons = [
    createBtn('me-info', 'Информация', ButtonStyle.Secondary),
];

export const meCommand: CommandType = {
    name: 'Я',
    description: 'Узнать информацию о себе',
    execute: async interaction => {
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)

        await interaction.reply({
            content: 'Выберите действие:',
            components: [row],
            ephemeral: true
        });
    }
}