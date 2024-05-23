import { CreateTeamT } from "../../types/CreateTeamT";
import { ITeam } from "../../interfaces/schemas/ITeam";
import { Document } from "mongoose";
import { Player, Team } from "../../database/models";
import handleError from "../handleError";
import { CatchErrorT } from "../../types/CatchErrorT";
import addRoleByName from "../roles/addRoleByName";
import { RolesEnum } from "../../enums/RolesEnum";

export default async ({ guildMember, name, image_url }: CreateTeamT): Promise<ITeam & Document | null> => {
    try {
        // Находим игрока по Discord ID
        const player = await Player.findOne({ discordId: guildMember.id }).exec();

        if (!player) {
            throw new Error(`Player with discord ID "${guildMember.id}" not found.`);
        }

        // Создаем новую команду с указанным именем и владельцем (игроком)
        const team = new Team({
            name,
            player_id: player._id,
            image_url,
        });

        player.teamId = team.id;

        // Сохраняем команду
        await team.save();
        await player.save();

        await addRoleByName(guildMember, RolesEnum.TeamLeader)

        return team;
    } catch (error: CatchErrorT) {
        throw new Error(`Failed to create team: ${handleError(error)}.`);
    }
}