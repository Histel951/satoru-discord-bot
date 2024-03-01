import { CommandType } from "./types";
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} from "discord.js";
import {findPlayerByDiscordId} from "../utils/player";
import {Types} from "mongoose";

export const TeamCommand: CommandType = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('Действия связанные с командой'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        try {
            const player = await findPlayerByDiscordId(interaction.user.id)

            const components: ButtonBuilder[] = []

            console.log(player.team.owner)

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

            await interaction.reply({
                content: 'Выберите действие команды:',
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error(`Error processing team command: ${error.message}`);

            // Обработка ошибки и отправка сообщения об ошибке пользователю
            await interaction.reply({
                content: 'Произошла ошибка при выполнении команды.',
                ephemeral: true
            });
        }
    }
}; 