import { CommandType } from "../../types/CommandTypes";
import { CommandInteraction } from "discord.js";
import acceptInviteExecute from "../../executions/commands/team/acceptInviteExecute";
import acceptInviteMiddleware from "../../middlewares/commands/team/acceptInviteMiddleware";

export const acceptInviteCommand: CommandType<CommandInteraction> = {
    name: 'invite-accept',
    description: 'Принять приглашение на вступление в команду.',
    options: [
        option =>
            option.setName('team-name')
                .setDescription('Имя команды в которую хотите принять приглашение на вступление.')
                .setRequired(true),
    ],
    middleware: acceptInviteMiddleware,
    execute: acceptInviteExecute,
}