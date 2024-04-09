import { CommandType } from "../../types/CommandTypes";
import { CommandInteraction } from "discord.js";
import teamKickExecute from "../../executions/commands/team/teamKickExecute";
import teamKickMiddleware from "../../middlewares/commands/team/teamKickMiddleware";

export const teamKickCommand: CommandType<CommandInteraction> = {
    name: 'team-kick',
    description: 'Кикнуть игрока из команды.',
    options: [
        option =>
            option
                .setName('tag')
                .setDescription('Tag пользователя.')
                .setRequired(true)
    ],
    middleware: teamKickMiddleware,
    execute: teamKickExecute,
}