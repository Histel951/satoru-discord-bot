import { CreateTeamT } from "../../types/CreateTeamT";
import { ITeam } from "../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import { Player, Team } from "../../database/models";
import handleError from "../handleError";
import {CatchErrorT} from "../../types/CatchErrorT";

export default async ({ discordId, name, image_url, color }: CreateTeamT): Promise<ITeam & Document | null> => {
    try {
        // Находим игрока по Discord ID
        const player = await Player.findOne({ discordId }).exec();

        if (!player) {
            throw new Error(`Player with discord ID "${discordId}" not found.`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name,
            player_id: player._id,
            image_url,
            color,
        });

        player.teamId = team.id;

        // Сохраняем команду
        await team.save();
        await player.save();

        return team;
    } catch (error: CatchErrorT) {
        throw new Error(`Failed to create team: ${handleError(error)}.`);
    }
}