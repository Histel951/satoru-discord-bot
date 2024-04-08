import { CommandType } from "../../types/CommandTypes";
import { CommandInteraction } from "discord.js";
import teamInfoExecute from "../../executions/commands/team/teamInfoExecute";
import teamInfoMiddleware from "../../middlewares/commands/team/teamInfoMiddleware";

export const teamInfoCommand: CommandType<CommandInteraction> = {
    name: 'team-info',
    description: 'Информация по команде.',
    options: [
        teamName =>
            teamName
                .setName('team-name')
                .setDescription('Информация по команде.')
                .setRequired(true),
    ],
    middleware: teamInfoMiddleware,
    execute: teamInfoExecute,
}