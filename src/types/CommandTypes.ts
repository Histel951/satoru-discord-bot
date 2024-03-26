import {
    BaseInteraction,
    Collection,
    CommandInteraction,
    InteractionResponse,
    SlashCommandStringOption,
} from "discord.js";
import { MiddlewareType } from "./MiddlewareTypes";

type optionBuilder = (option: SlashCommandStringOption) => SlashCommandStringOption;

export type ExecutedType = (interaction: CommandInteraction) => Promise<InteractionResponse<boolean>|void>

export type CommandType<InteractionType extends BaseInteraction> = {
    name: string
    description: string
    options?: optionBuilder[]
    execute: ExecutedType
    middleware?: MiddlewareType<InteractionType> | MiddlewareType<InteractionType>[]
};

export type CommandCollectionType<InteractionType extends BaseInteraction> = Collection<
    string,
    CommandType<InteractionType>
>;