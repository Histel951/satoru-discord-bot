import { CommandInteraction } from "discord.js";
import teamInfoExecute from "./teamInfoExecute";
import teamInfoMiddleware from "./teamInfoMiddleware";
import { CommandI } from "../../../../interfaces/CommandI";

export const teamInfoCommand: CommandI<CommandInteraction> = {
    name: 'team-info',
    description: 'Информация по команде.',
    options: [
        teamName =>
            teamName
                .setName('team-name')
                .setDescription('Информация по команде.')
                .setRequired(true),
    ],
    middleware: teamInfoMiddleware,
    execute: teamInfoExecute,
}