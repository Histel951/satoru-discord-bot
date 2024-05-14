import { CommandInteraction } from "discord.js";
import tournamentCreateExecute from "./tournamentCreateExecute";
import { CommandI } from "../../../../interfaces/CommandI";

export const tournamentCreateCommand: CommandI<CommandInteraction> = {
    name: 'tournament-create',
    description: 'Вызывает панельку для создания турнира',
    execute: tournamentCreateExecute,
};