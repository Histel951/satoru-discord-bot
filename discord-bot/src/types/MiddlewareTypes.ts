import {BaseInteraction} from "discord.js";

export type MiddlewareResult<InteractionType extends BaseInteraction> = {
    result: boolean,
    interaction: InteractionType,
    options?: object,
};

export type MiddlewareType<InteractionType extends BaseInteraction> =
    (interaction: InteractionType) => Promise<MiddlewareResult<InteractionType>>