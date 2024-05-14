import {
    BaseInteraction,
    CommandInteraction,
    InteractionResponse,
    SlashCommandStringOption,
} from "discord.js";
import { MiddlewareType } from "../types/MiddlewareTypes";

type ExecutedT = (interaction: CommandInteraction, options: any) => Promise<InteractionResponse|void>

type OptionBuilderT = (option: SlashCommandStringOption) => SlashCommandStringOption;

export type CommandI<InteractionType extends BaseInteraction> = {
    name: string
    description: string
    options?: OptionBuilderT[]
    execute: ExecutedT
    middleware?: MiddlewareType<InteractionType> | MiddlewareType<InteractionType>[]
};