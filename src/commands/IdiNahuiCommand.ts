import { CommandType } from "./types";
import {
    CommandInteraction,
    InteractionResponse,
    SlashCommandBuilder
} from "discord.js";

export const idiNahuiCommand: CommandType = {
    data: new SlashCommandBuilder()
    .setName('idi-nahui')
    .setDescription('придумай что-то более умное долбаёб'),
    execute(interaction: CommandInteraction) {
        return interaction.reply(`АХАХАХ КАК ЖЕ ТЫ ЗАЕБАЛ ${interaction.user.username}!!!!!!!!`);
    }
};