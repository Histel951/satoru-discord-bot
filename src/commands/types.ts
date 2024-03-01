import {
    Collection,
    CommandInteraction,
    ContextMenuCommandBuilder,
    InteractionResponse,
    SlashCommandBuilder
} from "discord.js";

export type CommandType = {
    data: SlashCommandBuilder|ContextMenuCommandBuilder
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse|void>
};

export type CommandCollectionType = Collection<
    string,
    CommandType
>