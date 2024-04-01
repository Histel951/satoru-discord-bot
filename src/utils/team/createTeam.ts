import { CreateTeamT } from "../../types/ModelTypes";
import { ITeam } from "../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import { Player, Team } from "../../database/models";
import handleError from "../handleError";

export default async ({ discord_id, name }: CreateTeamT): Promise<ITeam & Document | null> => {
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
}