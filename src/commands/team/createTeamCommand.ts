import { CommandType } from "../../types/CommandTypes";
import createTeamExecute from "../../executions/commands/team/createTeamExecute";
import createTeamMiddleware from "../../middlewares/commands/team/createTeamMiddleware";
import { CommandInteraction } from "discord.js";

export const createTeamCommand: CommandType<CommandInteraction> = {
    name: 'create-team',
    description: 'Создать свою команду.',
    middleware: createTeamMiddleware,
    execute: createTeamExecute,
}