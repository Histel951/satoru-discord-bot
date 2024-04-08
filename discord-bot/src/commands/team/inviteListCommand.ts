import { CommandType } from "../../types/CommandTypes";
import { CommandInteraction } from "discord.js";
import inviteListExecute from "../../executions/commands/team/inviteListExecute";

export const inviteListCommand: CommandType<CommandInteraction> = {
    name: 'invite-list',
    description: 'Получить список всех приглашений в команду.',
    execute: inviteListExecute,
};