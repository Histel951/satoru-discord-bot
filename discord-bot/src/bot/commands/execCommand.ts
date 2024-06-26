import {
    CommandInteraction,
    InteractionReplyOptions,
} from "discord.js";
import { MiddlewareResult, MiddlewareType } from "../../types/MiddlewareTypes";
import { CommandI } from "../../interfaces/CommandI";
import { InteractionT } from "../../types/InteractionT";

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

const executeWithMiddleware = async (interaction: CommandInteraction, command: CommandI<CommandInteraction>) => {
    const interactionMiddleware = await middlewareExecute(interaction, command.middleware)

    if (interactionMiddleware.result && command.execute) {
        await command.execute(interactionMiddleware.interaction, interactionMiddleware.options ?? {});
    } else {
        await interactionMiddleware.interaction.reply(interactionMiddleware?.options as InteractionReplyOptions);
    }
}

export default async (interaction: CommandInteraction & InteractionT) => {
    const command = interaction.client.data?.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    if (command.middleware) {
        await executeWithMiddleware(interaction, command);
        return;
    }

    if (command.execute) {
        await command.execute(interaction, {});
        return;
    }
}