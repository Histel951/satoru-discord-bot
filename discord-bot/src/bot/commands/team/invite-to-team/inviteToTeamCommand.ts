import { CommandInteraction } from "discord.js";
import InviteToTeamExecute from "./inviteToTeamExecute";
import InviteToTeamMiddleware from "./InviteToTeamMiddleware";
import { CommandI } from "../../../../interfaces/CommandI";

export const inviteToTeamCommand: CommandI<CommandInteraction> = {
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