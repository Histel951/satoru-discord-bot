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

    let resultExecuting: MiddlewareResult<CommandInteraction> = {
        result: true,
        interaction
    };

    if (middleware instanceof Array) {
        for (const executedMiddleware of middleware) {
            resultExecuting = await executedMiddleware(interaction);

            if (!resultExecuting.result) {
                return resultExecuting;
            }
        }

        return resultExecuting;
    }

    if (middleware instanceof Function) {
        return middleware(interaction);
    }

    return resultExecuting;
}

const executeWithMiddleware = async (interaction: CommandInteraction, command: CommandType<CommandInteraction>) => {
    const interactionMiddleware = await middlewareExecute(interaction, command.middleware)

    if (interactionMiddleware.result) {
        await command.execute(interactionMiddleware.interaction);
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
            : await command.execute(interaction);
    }
}