import { CommandInteraction } from "discord.js";
import inviteListExecute from "./inviteListExecute";
import { CommandI } from "../../../../interfaces/CommandI";

export const inviteListCommand: CommandI<CommandInteraction> = {
    name: 'invite-list',
    description: 'Получить список всех приглашений в команду.',
    execute: inviteListExecute,
};