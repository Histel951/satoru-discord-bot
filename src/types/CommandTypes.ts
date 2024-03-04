import {
    Collection,
    CommandInteraction,
    InteractionResponse,
} from "discord.js";

export type CommandType = {
    name: string
    description: string
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse|void>
};

export type CommandCollectionType = Collection<
    string,
    CommandType
>