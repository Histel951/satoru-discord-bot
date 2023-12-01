import {Collection, CommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";

export type CommandType = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse>
};

export type CommandCollectionType = Collection<
    string,
    CommandType
>