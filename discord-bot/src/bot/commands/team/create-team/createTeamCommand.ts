import { CommandI } from "../../../../interfaces/CommandI";
import createTeamExecute from "./createTeamExecute";
import createTeamMiddleware from "./createTeamMiddleware";
import { CommandInteraction } from "discord.js";

export const createTeamCommand: CommandI<CommandInteraction> = {
    name: 'create-team',
    description: 'Создать свою команду.',
    middleware: createTeamMiddleware,
    execute: createTeamExecute,
}