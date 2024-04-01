import { CommandType } from "../../types/CommandTypes";
import unRegisterExecute from "../../executions/commands/auth/unRegisterExecute";
import { CommandInteraction } from "discord.js";

export const unRegisterCommand: CommandType<CommandInteraction> = {
    name: 'unregister',
    description: 'Отменяет регистрацию пользователя',
    options: [
        option =>
        option.setName('tag')
            .setDescription('Tag пользователя.')
            .setRequired(true),
    ],
    execute: unRegisterExecute,
};