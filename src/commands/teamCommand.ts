import { CommandType } from "../types/CommandTypes";
import {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    CommandInteraction,
    CacheType,
} from "discord.js";
import { findPlayerByDiscordId } from "../utils/player";
import {Error} from "mongoose";
import handleError from "../utils/handleError";

export const TeamCommand: CommandType = {
    name: 'team',
    description: 'Действия связанные с командой',
    execute: async (interaction: CommandInteraction<CacheType>): Promise<void> => {
        try {
            const player = await findPlayerByDiscordId(interaction.user.id)

            const components: ButtonBuilder[] = []

            console.log(player?.team?.owner)

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
            console.error(`Error processing team command: ${handleError(error as Error)}.`);

            // Обработка ошибки и отправка сообщения об ошибке пользователю
            await interaction.reply({
                content: 'Произошла ошибка при выполнении команды.',
                ephemeral: true
            });
        }
    }
}; 