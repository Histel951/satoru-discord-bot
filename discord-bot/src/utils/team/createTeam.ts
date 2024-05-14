import { CreateTeamT } from "../../types/CreateTeamT";
import { ITeam } from "../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import { Player, Team } from "../../database/models";
import handleError from "../handleError";
import {CatchErrorT} from "../../types/CatchErrorT";

export default async ({ discord_id, name, image_url, color }: CreateTeamT): Promise<ITeam & Document | null> => {
    try {
        // Находим игрока по Discord ID
        const player = await Player.findOne({ discord_id }).exec();

        if (!player) {
            throw new Error(`Player with discord ID "${discord_id}" not found.`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name,
            player_id: player._id,
            image_url,
            color,
        });

        player.team_id = team.id;

        // Сохраняем команду
        await team.save();
        await player.save();

        return team;
    } catch (error: CatchErrorT) {
        throw new Error(`Failed to create team: ${handleError(error)}.`);
    }
}