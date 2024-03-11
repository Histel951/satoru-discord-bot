import {
    BaseInteraction,
    Collection,
    CommandInteraction,
    InteractionResponse, SlashCommandStringOption,
} from "discord.js";

type optionBuilder = (option: SlashCommandStringOption) => SlashCommandStringOption;

export type CommandType = {
    name: string
    description: string
    options?: optionBuilder[]
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse|void>
    middleware?: (interaction: CommandInteraction) => Promise<CommandInteraction | InteractionResponse>
};

export type CommandCollectionType = Collection<
    string,
    CommandType
>;