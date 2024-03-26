import { User, Team, Player } from "../database/models";
import { CreateTeamT } from "../types/ModelTypes";
import handleError from "./handleError";
import { Document } from "mongoose";
import { ITeam } from "../interfaces/schemas/ITeam";

export const createTeam = async ({ discord_id, name }: CreateTeamT): Promise<ITeam & Document | null> => {
    try {
        // Находим игрока по Discord ID
        const player = await Player.findOne({ discord_id }).exec();

        if (!player) {
            throw new Error(`Player with discord ID "${discord_id}" not found.`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name: name,
            player_id: player,
        });

        player.team_id = team.id;

        // Сохраняем команду
        await team.save();
        await player.save();

        return team;
    } catch (e) {
        throw new Error(`Failed to create team: ${handleError(e as Error)}.`);
    }
};
