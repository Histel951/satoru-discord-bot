import { CommandInteraction } from "discord.js";
import teamKickExecute from "./teamKickExecute";
import teamKickMiddleware from "./teamKickMiddleware";
import { CommandI } from "../../../../interfaces/CommandI";

export const teamKickCommand: CommandI<CommandInteraction> = {
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