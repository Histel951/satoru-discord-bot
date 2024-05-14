import { CommandInteraction } from "discord.js";
import acceptInviteExecute from "./acceptInviteExecute";
import acceptInviteMiddleware from "./acceptInviteMiddleware";
import { CommandI } from "../../../../interfaces/CommandI";

export const acceptInviteCommand: CommandI<CommandInteraction> = {
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