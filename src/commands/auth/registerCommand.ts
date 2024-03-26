import { CommandType } from "../../types/CommandTypes";
import registerMiddleware from "../../middlewares/commands/auth/registerMiddleware";
import registerExecute from "../../executions/commands/auth/registerExecute";
import { CommandInteraction } from "discord.js";

export const registerCommand: CommandType<CommandInteraction> = {
    name: 'register',
    description: 'Зарегистрироваться на сервере как игрок',
    middleware: registerMiddleware,
    execute: registerExecute,
};
