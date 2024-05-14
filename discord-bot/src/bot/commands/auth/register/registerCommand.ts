import { CommandI } from "../../../../interfaces/CommandI";
import registerMiddleware from "./registerMiddleware";
import registerExecute from "./registerExecute";
import { CommandInteraction } from "discord.js";

export const registerCommand: CommandI<CommandInteraction> = {
    name: 'register',
    description: 'Зарегистрироваться на сервере как игрок',
    middleware: registerMiddleware,
    execute: registerExecute,
};
