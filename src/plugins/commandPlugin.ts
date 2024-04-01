import {
    CommandInteraction,
    Interaction, InteractionReplyOptions,
} from "discord.js";
import { commands } from "../containers";
import { MiddlewareResult, MiddlewareType } from "../types/MiddlewareTypes";
import { CommandType } from "../types/CommandTypes";

const middlewareExecute = async (
    interaction: CommandInteraction,
    middleware: MiddlewareType<CommandInteraction> | MiddlewareType<CommandInteraction>[] | undefined
): Promise<MiddlewareResult<CommandInteraction>> => {
    let options = {};

    if (middleware instanceof Array) {
        for (const executedMiddleware of middleware) {
            const resultExecuting = await executedMiddleware(interaction);

            if (!resultExecuting.result) {
                return resultExecuting;
            }

            if (resultExecuting.options) {
                options = { ...resultExecuting.options };
            }
        }

        return {
            result: true,
            interaction,
            options
        };
    }

    if (middleware instanceof Function) {
        return middleware(interaction);
    }

    return {
        result: true,
        interaction
    };
}

const executeWithMiddleware = async (interaction: CommandInteraction, command: CommandType<CommandInteraction>) => {
    const interactionMiddleware = await middlewareExecute(interaction, command.middleware)

    if (interactionMiddleware.result) {
        await command.execute(interactionMiddleware.interaction, interactionMiddleware.options ?? {});
    } else {
        await interactionMiddleware.interaction.reply(interactionMiddleware?.options as InteractionReplyOptions);
    }
}

export default async (interaction: Interaction): Promise<void> => {
    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName);

        if (!command) {
            return;
        }

        command.middleware
            ? await executeWithMiddleware(interaction, command)
            : await command.execute(interaction, {});
    }
}