import { CommandType } from "./types";
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} from "discord.js";

export const CreateTeamCommand: CommandType = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('Действия связанные с командой'),
    execute: async (Interaction: ChatInputCommandInteraction) => {
        const createCommandBtn = new ButtonBuilder()
            .setCustomId('team-create-btn')
            .setLabel('Создать команду')
            .setStyle(ButtonStyle.Success)

        const testBtn = new ButtonBuilder()
            .setCustomId('team-info-btn')
            .setLabel('Информация')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(createCommandBtn, testBtn)

        return Interaction.reply({
            content: 'Выберите действие команды:',
            components: [row],
            ephemeral: true 
        });
    }
}; 