import { CommandType } from "../../types/CommandTypes";
import { CommandInteraction } from "discord.js";
import InviteToTeamExecute from "../../executions/commands/team/inviteToTeamExecute";
import InviteToTeamMiddleware from "../../middlewares/commands/team/InviteToTeamMiddleware";

export const inviteToTeamCommand: CommandType<CommandInteraction> = {
    name: 'invite-to-team',
    description: 'Пригласить в команду',
    options: [
        tag =>
            tag.setName('tag')
                .setDescription('Tag пользователя.')
                .setRequired(true),
        role =>
            role
                .setName('role')
                .setDescription('Роль игрока в команде')
                .setRequired(true)
    ],
    middleware: InviteToTeamMiddleware,
    execute: InviteToTeamExecute,
};