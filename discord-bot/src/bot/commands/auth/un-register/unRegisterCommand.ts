import { CommandI } from "../../../../interfaces/CommandI";
import unRegisterExecute from "./unRegisterExecute";
import { CommandInteraction } from "discord.js";

export const unRegisterCommand: CommandI<CommandInteraction> = {
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