import {
    CommandInteraction,
    InteractionResponse,
    SlashCommandBuilder
} from "discord.js";
import {CommandType} from "./types";

class IdiNahuiCommand implements CommandType
{
    data: SlashCommandBuilder;

    constructor() {
        this.data = new SlashCommandBuilder()
            .setName('idi-nahui')
            .setDescription('придумай что-то более умное долбаёб');
    }

    execute(interaction: CommandInteraction): Promise<InteractionResponse> {
        return interaction.reply(`АХАХАХ КАК ЖЕ ТЫ ЗАЕБАЛ ${interaction.user.username}!!!!!!!!`);
    }
}

export default IdiNahuiCommand;