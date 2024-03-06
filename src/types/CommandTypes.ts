import {
    Collection,
    CommandInteraction,
    InteractionResponse,
} from "discord.js";

export type CommandType = {
    name: string
    description: string
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse|void>
    middleware?: (interaction: CommandInteraction) => Promise<CommandInteraction | InteractionResponse>
};

export type CommandCollectionType = Collection<
    string,
    CommandType
>