import { CommandType } from "../../types/CommandTypes";
import { CommandInteraction } from "discord.js";
import tournamentCreateExecute from "../../executions/commands/tournament/tournamentCreateExecute";

export const tournamentCreateCommand: CommandType<CommandInteraction> = {
    name: 'tournament-create',
    description: 'Вызывает панельку для создания турнира',
    execute: tournamentCreateExecute,
};