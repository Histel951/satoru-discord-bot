import {
    BaseInteraction,
    InteractionResponse,
    SlashCommandStringOption,
} from "discord.js";
import { MiddlewareType } from "../types/MiddlewareTypes";

export type ExecuteT<InteractionT extends BaseInteraction>
    = (interaction: InteractionT, options: any) => Promise<InteractionResponse | void>;

export type CommandOptionSetCallbackT = (option: SlashCommandStringOption) => SlashCommandStringOption;

export type CommandI<InteractionT extends BaseInteraction> = {
    getName: () => string
    getDescription: () => string
    execute?: ExecuteT<InteractionT>
    middleware?: MiddlewareType<InteractionT> | MiddlewareType<InteractionT>[]
    getOptions?: () => CommandOptionSetCallbackT[]
};