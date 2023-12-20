import { CommandType } from "./types";
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} from "discord.js";

export const TeamCommand: CommandType = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('Действия связанные с командой'),
    execute: async (Interaction: ChatInputCommandInteraction) => {
        const createCommandBtn = new ButtonBuilder()
            .setCustomId('team-create-btn')
            .setLabel('Создать команду')
            .setStyle(ButtonStyle.Success)

        const addMembersToTeam = new ButtonBuilder()
            .setCustomId('add-members-to-team')
            .setLabel('Добавить участников')
            .setStyle(ButtonStyle.Secondary)

        const testBtn = new ButtonBuilder()
            .setCustomId('team-info-btn')
            .setLabel('Информация')
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(createCommandBtn, testBtn, addMembersToTeam)

        return Interaction.reply({
            content: 'Выберите действие команды:',
            components: [row],
            ephemeral: true 
        });
    }
}; 