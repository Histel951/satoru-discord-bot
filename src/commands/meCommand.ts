import {CommandType} from "../types/CommandTypes";
import createBtn from "../utils/ui/createBtn";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import {findPlayerByDiscordId} from "../utils/player";

const buttons = [
    createBtn({ customId: 'me-info', label: 'Информация', style: ButtonStyle.Secondary }),
    createBtn({ customId: 'me-dota-id-modal', label: 'Указать id', style: ButtonStyle.Secondary })
];

export const meCommand: CommandType = {
    name: 'me',
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